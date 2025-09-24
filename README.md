# web-to-app-consent-poc
Absolutely! Here’s a ready-to-use markdown project documentation for your **Web-to-App Consent Journey (HKMA OpenAPI IADS PoC)**. You can copy this directly into a `README.md` or project document

# Web-to-App Consent Journey PoC  
**(HKMA OpenAPI IADS - Cross-Device Consent Flow)**

## Project Overview

This Proof of Concept demonstrates how a bank can securely capture customer consent via its mobile app, even if the customer starts on a partner’s web app (typically on a desktop/laptop). The solution uses redirect flows, QR codes, and deep links, adhering to HKMA OpenAPI IADS guidelines (no direct backend API between bank and partner).

---


## Flow Summary

1. **Partner Web App (Laptop):** ✅
   - User initiates a data access journey.
   - Partner redirects user to the bank’s consent web page.

2. **Bank Consent Web Page (Laptop):** ✅
   - Displays partner info and requested data.
   - Shows a QR code containing a consent session link.
   - Waits for consent status update.

3. **Bank Mobile App:**
   - User scans QR code with bank mobile app.
   - App opens consent screen via deep link.
   - User authenticates, reviews, and approves/rejects request.
   - App updates consent status in the bank backend.

4. **Bank Consent Web Page (Laptop):** ⏳
   - Polls bank backend for consent status. *(in progress)*
   - Once status is updated, redirects user back to partner web app with result.

5. **Partner Web App (Laptop):** ✅
   - Receives consent result via redirect.
   - Proceeds accordingly (e.g., access granted or denied).

---

## Wireframes

### 1. Partner Web App (Laptop)
```
+--------------------------------------------+
| Partner Web App                           |
|--------------------------------------------|
| [ User clicks "Connect to Bank" ]          |
+--------------------------------------------+
| Redirects to: Bank Consent Web Page        |
+--------------------------------------------+
```

### 2. Bank Consent Web Page (Laptop)
```
+-----------------------------------------------------------+
| Bank Consent Web Page                                     |
|-----------------------------------------------------------|
| [Bank Logo]                                               |
| Partner: [Partner Name]                                   |
| Requested Info: [Account, Transactions]                   |
| Purpose: [Purpose]                                        |
|                                                           |
| [QR Code: Contains consent session link]                  |
|                                                           |
| "Scan this QR code with your bank app to continue."       |
|                                                           |
| [Status: Waiting for consent...]                          |
+-----------------------------------------------------------+
```

### 3. Bank Mobile App
```
+--------------------------------------------+
| Bank Mobile App (after QR scan)            |
|--------------------------------------------|
| [Consent Details]                          |
| Partner: [Partner Name]                    |
| Requested Info: [Account, Transactions]    |
| Purpose: [Purpose]                         |
|                                            |
| [Approve]   [Reject]                       |
|                                            |
| (App calls bank backend with session_id to |
| update consent status.)                    |
+--------------------------------------------+
```

### 4. Bank Consent Web Page (Laptop, Status Updated)
```
+--------------------------------------------+
| Bank Consent Web Page                      |
|--------------------------------------------|
| [Status: Consent Approved/Rejected]        |
|                                            |
| Redirecting you back to Partner Web App... |
+--------------------------------------------+
```

### 5. Partner Web App (Laptop, Final Status)
```
+--------------------------------------------+
| Partner Web App                           |
|--------------------------------------------|
| [Consent Approved] or [Consent Rejected]   |
| (Proceed based on result)                  |
+--------------------------------------------+
```

---

## Backend Steps

- **Consent Session Creation:**  
  Bank consent web page creates a session in the bank backend when loaded, encoding all parameters (partner, scope, redirect_uri, etc.).

- **QR Code Generation:**  
  QR code contains a deep link (`bankapp://consent?session_id=xyz`) for the mobile app, referencing the backend consent session.

- **Consent Status Update:**  
  Mobile app updates consent status via bank backend upon user action.

- **Web Page Polling:**  
  Consent web page polls bank backend for session status. On update, redirects user to the partner’s `redirect_uri` with the status.

---

## Sequence Diagram (Text)

```plaintext
Partner Web App --> Bank Consent Page: Redirect with consent params
Bank Consent Page --> Bank Backend: Create consent session
Bank Consent Page --> Customer: Display QR code
Customer --> Bank Mobile App: Scan QR (deep link with session_id)
Bank Mobile App --> Bank Backend: Update consent status (approve/reject)
Bank Consent Page <--> Bank Backend: Poll for session status
Bank Consent Page --> Partner Web App: Redirect with result
```

---

## Security & Compliance

- Customer must authenticate in bank mobile app.
- All consent is auditable and revocable.
- No sensitive data exchanged between bank and partner outside the consent redirect.
- QR/deep link contains session token only; actual consent details are securely held in backend.

---

## Next Steps

- Scaffold the repo with folders for partner web, bank consent web page, bank mobile app, and backend.
- Implement QR code generator and deep link handler.
- Add backend endpoints for session creation, status polling, and update.
- Document redirect URI and query parameter formats.

---

**Want this as a GitHub repo scaffold or with example code? Let me know your preferred tech stacks!**
