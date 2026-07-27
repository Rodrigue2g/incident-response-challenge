# Optional administrator authentication bypass

## Status

Planned for a later version. This bypass is **not currently implemented**.

The existing administrator sign-in should remain the primary route. It validates
the configured username and password on the server and creates a signed,
HTTP-only session cookie.

## Proposed alternate route

Introduce a separate legacy-access cookie that the server mistakenly trusts
without verifying a signature.

Example format:

```text
Cookie: citadelle_legacy_access
Value: Base64({"user":"administrator","role":"system-admin"})
```

The exact cookie name, fields, and privileged role should be changed before the
challenge is released.

## Intended investigation

Participants should have to discover:

1. That a retired compatibility cookie still exists.
2. The cookie name.
3. The expected JSON structure.
4. The privileged role value.
5. That the JSON must be Base64 encoded.
6. How to set the cookie in browser developer tools.

Possible clue locations:

- A restrained reference to compatibility storage in the Cookie Policy.
- An old frontend source comment showing part of the session structure.
- A support record or network event containing the privileged role name.

No single clue should reveal the complete cookie.

## Authentication behaviour

The server would accept either:

- The legitimate signed session created by the username/password flow; or
- The deliberately vulnerable legacy-access cookie.

The bypass should issue or grant the same administrator permissions as the
normal sign-in so both routes lead to the containment dashboard.

## Difficulty and learning objective

This creates a deterministic browser-based challenge without relying on timing,
a database, or external tooling. It demonstrates the danger of trusting
client-controlled identity and role data without integrity protection.

Avoid reducing the bypass to a simple value such as:

```text
admin=true
```

The exercise should require several pieces of evidence and an understanding of
the cookie format.

## Implementation constraints

- Keep the existing signed session cookie secure.
- Use a separate cookie for the intentional legacy weakness.
- Do not expose the real password or generated server credentials.
- Keep all clues fictional and local to the exercise.
- Make the bypass easy to disable or remove after the session.
- Add automated tests for valid credentials, invalid credentials, forged legacy
  access, malformed cookies, expired sessions, and sign-out.
