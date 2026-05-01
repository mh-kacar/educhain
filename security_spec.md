# Security Specification - Scholastic Chain

## 1. Data Invariants
- A **Block** must always have a `previousHash` pointing to the `hash` of the block with `index - 1`.
- A **Block** can only be created if its `index` is `lastBlock.index + 1`.
- Blocks are immutable once written.
- Students and Projects can only be managed by verified admins.
- Any user can read the chain (public ledger).

## 2. Dirty Dozen Payloads
1. Create a block with index 0 (Genesis) when one already exists.
2. Create a block with a skip in index (e.g., index 5 when current is 3).
3. Update a block's `data` to change participation history.
4. Delete a block to break the chain.
5. Create a block with a spoofed `previousHash`.
6. Add a student record with a nonexistent student ID (relational check).
7. Non-admin trying to add a student.
8. Non-admin trying to add a project.
9. Admin trying to delete a block.
10. Creating a block with a self-calculated `hash` that doesn't meet difficulty (if we add PoW) or just doesn't match the data.
11. Changing the `nonce` of an existing block.
12. Overwriting a student record they don't own.

## 3. Test Runner (Draft)
The tests will verify:
- `allow read: if true` for blocks.
- `allow create: if isAdmin() && isValidBlock(incoming())` for blocks.
- `allow update, delete: if false` for blocks.
- `allow write: if isAdmin()` for students and projects.
