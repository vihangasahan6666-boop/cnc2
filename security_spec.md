# Security Specification: Contact Submissions Service

This document defines the zero-trust data invariants and security bounds for storing CNC contact form submissions inside Cloud Firestore.

## 1. Data Invariants

- **Collection ID**: `submissions`
- **Document Path Key**: `submissions/{submissionId}`
- **Security Boundaries**:
  - **Create Policy**: Any unauthenticated or public client is authorized to submit (create) a single submission document, provided they strictly satisfy structural field limits, name-length validations, message constraints, and contain either a valid validated email address OR a valid validated phone number, but are forbidden from setting unexpected properties or performing bulk uploads.
  - **Read/Update/Delete Policy**: Absolutely forbidden (`if false`) for any client-side user. Submissions represent sensitive, highly private customer data. Clients can only write (emit) data but have a 100% blind gate preventing them from checking other records or retrieving their own historical records from the firestore.

---

## 2. The "Dirty Dozen" Payloads

Here are twelve highly malicious payloads designed to audit and verify that our Fortress rules reject bad or abusive writes:

1. **The Ghost Field Attack**:
   - *Payload*: `{ id: "sub123", name: "John", message: "Hello", createdAt: "2026-06-14T03:41:27Z", isApproved: true }`
   - *Result*: **REJECTED** (Keys must strictly match the declared schema; no arbitrary fields allowed).
2. **The Anonymous Read/Harvest Leak**:
   - *Action*: `READ /submissions/sub123`
   - *Result*: **REJECTED** (No reads/listings on submissions collection).
3. **The Unstructured ID Poisoning Attack**:
   - *Path*: `/submissions/invalid_$_id_characters_too_long_overflow_overflow_overflow`
   - *Result*: **REJECTED** (Document IDs must match a strict alphanumeric format and length constraints).
4. **The Empty Message Attack**:
   - *Payload*: `{ id: "sub123", name: "John", email: "john@example.com", message: "", createdAt: "2026-06-14T03:41:27Z" }`
   - *Result*: **REJECTED** (Message length must be at least 1 letter).
5. **The Missing Contact Method Attack**:
   - *Payload*: `{ id: "sub123", name: "John", message: "I am missing email/phone details", createdAt: "2026-06-14T03:41:27Z" }`
   - *Result*: **REJECTED** (At least one of `email` or `phone` must be populated).
6. **The Client-Side Spoofed Timestamp Attack**:
   - *Payload*: `{ id: "sub123", name: "John", message: "Spam", email: "john@ex.co", createdAt: "2010-01-01T00:00:00Z" }`
   - *Result*: **REJECTED** (Timestamps must match or be verified against the server time runtime).
7. **The Bulk Collection Query Leak**:
   - *Action*: `LIST /submissions`
   - *Result*: **REJECTED** (List operations are strictly disallowed).
8. **The Malicious Overwrite (Update) Threat**:
   - *Action*: `UPDATE /submissions/sub123`
   - *Result*: **REJECTED** (Update operations are absolutely forbidden).
9. **The Deletion Erasure Breach**:
   - *Action*: `DELETE /submissions/sub123`
   - *Result*: **REJECTED** (Submissions are read-only-append, cannot be deleted by public clients).
10. **The Giant Message Denial of Wallet attack**:
    - *Payload*: `{ id: "sub123", name: "John", message: "[1MB OF RANDOM JUNK]", email: "john@example.com", createdAt: "2026-06-14T03:41:27Z" }`
    - *Result*: **REJECTED** (Message must not exceed 5000 characters).
11. **The Malformed Email Format Attack**:
    - *Payload*: `{ id: "sub123", name: "John", email: "not-an-email", message: "No phone is given here", createdAt: "2026-06-14T03:41:27Z" }`
    - *Result*: **REJECTED** (If email is provided, it must match the standard email pattern).
12. **The Malformed Phone Format Attack**:
    - *Payload*: `{ id: "sub123", name: "John", phone: "abc-def-invalid", message: "No email is given here", createdAt: "2026-06-14T03:41:27Z" }`
    - *Result*: **REJECTED** (If phone is provided, it must match the standard phone digit pattern validation).

---

## 3. The Test Runner

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';

describe('Contact Submissions Rules Unit Tests', () => {
  it('rejects general list/get queries to ensure extreme PII data privacy', async () => {
    const testEnv = await initializeTestEnvironment({ projectId: 'gen-lang-client-0347523498' });
    const context = testEnv.unauthenticatedContext();
    await assertFails(context.firestore().collection('submissions').get());
  });

  it('rejects updates and deletes by any user role', async () => {
    const testEnv = await initializeTestEnvironment({ projectId: 'gen-lang-client-0347523498' });
    const context = testEnv.unauthenticatedContext();
    await assertFails(context.firestore().doc('submissions/sub123').update({ name: 'Spoofed' }));
    await assertFails(context.firestore().doc('submissions/sub123').delete());
  });
});
```
