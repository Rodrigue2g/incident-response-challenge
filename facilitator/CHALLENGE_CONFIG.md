# Configuring the charade

Edit `facilitator/challenge.env`, then run:

```bash
npm run generate:challenges
```

The generator uses only Python’s standard library and rebuilds:

- the configured location image from its pristine facilitator copy, then appends the image-forensics marker;
- `public/evidence/network_capture.log` with shuffled, ordered Base64 fragments;
- `lib/generated-challenge.ts` with three website-source fragments and only a hash of the final password;
- `server/generated-chat-secret.ts` for the server-only Help Assistant challenge;
- `server/generated-admin-credentials.ts` with the administrator ID, a derived
  password hash, and the local session-signing key;
- the unfinished student `fraud_analysis.ipynb`;
- the completed facilitator notebook.

Keep `facilitator/` out of any student-only distribution because it contains the
plain final answer and pristine assets. Generated student files can be copied as-is.

`ADMIN_USERNAME` and `FINAL_PASSWORD` control the administrator sign-in. The
password is shared with the final charade answer; neither value is sent to the
browser as part of the sign-in flow.
