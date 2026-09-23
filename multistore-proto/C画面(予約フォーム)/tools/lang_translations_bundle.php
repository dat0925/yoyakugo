<?php
declare(strict_types=1);

$LT_CHK = 'Check' . "\u{2011}" . 'in';
$LT_CHK_DETAILS = $LT_CHK . ' / Reservation Details';
$LT_COMPLETE_CHK = 'Complete ' . $LT_CHK_DETAILS;
$LT_CHANGE_CHK = 'Change ' . $LT_CHK_DETAILS;
$LT_RETURN_FORM = 'Return to ' . $LT_CHK . ' / Reservation Form';
$LT_NOT_COMPLETE = 'Your ' . $LT_CHK . ' / reservation is not yet complete.';
$LT_COMPLETED = 'Your ' . $LT_CHK . ' / reservation has been completed.';
$LT_REVIEW = 'Please review your entered information and click the "' . $LT_COMPLETE_CHK . '" button if everything is correct.';
$LT_CONFIRM_EMAIL = 'We have sent a confirmation email regarding your ' . $LT_CHK . ' / reservation.<br/>For changes or cancellations, please contact us by phone.<br/>';

$LT_PRIVACY_EN = <<<'EN'
Handling of Personal Information
Our clinic appropriately manages patients' personal information and uses it only for the following purposes.

1. Purpose of Use of Personal Information
・Management of medical appointments
・Communication regarding medical treatment
・Sending reservation confirmation emails
・Provision of medical services

2. Provision of Personal Information to Third Parties
Our clinic will not provide personal information to third parties without the patient's consent, except as required by law.

3. Management of Personal Information
Our clinic will take appropriate security measures to prevent leakage, loss, or damage of personal information.

4. Disclosure, Correction, and Deletion of Personal Information
Patients may request disclosure, correction, or deletion of their personal information. If you wish to do so, please contact our reception desk.

5. Inquiries
For inquiries regarding the handling of personal information, please contact our clinic reception desk.
EN;

$LT_TERMS_EN = <<<'EN'
Article 1 (Application)
These Terms and Conditions set forth the conditions for use of the online reservation service (hereinafter referred to as "this Service") provided by our clinic. Users of this Service shall be deemed to have agreed to these Terms and Conditions.

Article 2 (Reservation Application)
Users may apply for medical appointments at our clinic through this Service. A reservation shall be deemed established upon the sending of a confirmation email from our clinic.

Article 3 (Cancellation)
Please contact us at least 24 hours before the scheduled appointment time to cancel. If no-shows continue, we may refuse future reservations.

Article 4 (Prohibited Acts)
Users shall not engage in the following acts:
・Registering false information
・Using another person's personal information without authorization
・Acts that interfere with the operation of this Service

Article 5 (Disclaimer)
Our clinic shall not be liable for any damages arising from the use of this Service, except in cases of willful misconduct or gross negligence.
EN;

$LT_HTML_KEYS = [
    'Guests &amp; Menu',
    'Date & Time',
    'Details',
    'Announcements',
    'Please bring your insurance card for your first consultation.<br/>Arrive at least ten minutes before your scheduled check‑in time.',
    'Store description, store description, store description, store description, store description, store description, store description.<br/>Store description, store description.',
    'Open Hours',
    'Closed on the tenth of every month.<br/>On the first and third Thursdays each month, we are open until nineteen.',
    'Select Number of Guests &amp; Menu',
    'Number of Guests',
    'If your party size is not listed in the options, please contact us by phone.',
    'Select Date and Time',
    'August 2025',
    '◎: Available',
    '×: Unavailable / Closed',
    'Previous 7 days',
    'Next 7 days',
    'Swipe horizontally to view all content.',
    'Menu Name Menu Name',
    'Description text, description text, description text, description text.',
    'Price',
    'Required Time',
    '30 minutes',
    '60 minutes',
    '15 minutes',
    $LT_CHK_DETAILS,
    'Name',
    'Required',
    'Name (Furigana)',
    'Phone Number',
    'Email Address',
    'Comments',
    'A verification email containing a PIN code will be sent.',
    'Please configure your email settings to receive messages from noreply@iflag.co.jp.',
    'Please note that it may be sorted into your spam folder.',
    'Agree to the ',
    'Terms of Service',
    'Privacy Policy',
    'IFLAG Privacy Policy',
    'Personal Information Handling Disclosure',
    'Agree & Review',
    'Confirm',
    'Complete',
    $LT_NOT_COMPLETE,
    $LT_REVIEW,
    'Service',
    'Menu 1',
    'December 1 (Mon) 10:30',
    'Reservation Information',
    'Email Verification',
    'PIN Code',
    'Valid Until',
    'Resend PIN Code',
    'A verification email has been sent to test@iflag.co.jp.',
    'Please enter the PIN code from the email.',
    'If you do not receive the email, please check your spam folder<br/>or verify the email address you entered and submit again.',
    $LT_CHANGE_CHK,
    $LT_COMPLETE_CHK,
    'I would like a female practitioner.',
    $LT_COMPLETED,
    $LT_CONFIRM_EMAIL,
    $LT_RETURN_FORM,
    'Privacy Policy',
    'Close',
    'Terms of Service',
];

$LT_MSG_KEYS = [
    '7 days', '14 days', 'Previous', 'Next', 'Year', 'Month',
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    'Public Holiday', 'No available slots.', 'Loading...', 'Error: ', 'Failed to fetch available slots.',
    'Last Name', 'First Name',
    'Please select a menu.', 'Please select a date and time.',
    'Please enter your last name.', 'Please enter your first name.',
    'Please enter your last name (Furigana).', 'Please enter your first name (Furigana).',
    'Please enter your phone number.', 'Please enter your email address.',
    'Please enter correctly.', 'Please enter in full-width katakana.',
    'Please enter your phone number correctly.', 'Please enter your email address correctly.',
    'The date and time format is incorrect.', 'The menu ID is incorrect.',
    'Please enter your last name within 32 characters.', 'The last name is incorrect.',
    'Please enter your first name within 32 characters.', 'The first name is incorrect.',
    'Please enter your last name (Furigana) within 32 characters.', 'The last name (Furigana) is incorrect.',
    'Please enter your first name (Furigana) within 32 characters.', 'The first name (Furigana) is incorrect.',
    'Please enter a valid email address.', 'Please enter your email address within 255 characters.',
    'The phone number format is incorrect.', 'Please enter your phone number within 13 characters.',
    'Please enter your phone number at least 12 characters.', 'Please enter your comment within 1000 characters.',
    'The comment is incorrect.', 'Emoji is not allowed.', 'Emoji is not allowed in the comment.',
    'Sending...', 'Failed to send.', 'An unexpected error occurred.',
    'Resend PIN code', 'Please enter the PIN code.',
    'The PIN code is incorrect. Please try again.',
    'The PIN code retry limit has been reached. Please receive the PIN code again.',
    'The PIN code has expired. Please receive the PIN code again.',
    'Resending...', 'The PIN code has been resent.', 'Failed to resend the PIN code.',
    'Verifying...', 'The PIN code has been entered correctly.',
    'Registering...', 'The reservation has been registered.', 'Failed to register the reservation.',
    'The session has expired. Please start the reservation again.', 'A server error occurred.',
];

$LT_LANG_META = require __DIR__ . '/lang_translations_meta.php';

$TRANSLATIONS = [];
foreach ($LT_LANG_META as $code => $meta) {
    if (count($LT_HTML_KEYS) !== count($meta['html'])) {
        throw new RuntimeException("HTML count mismatch for {$code}");
    }
    if (count($LT_MSG_KEYS) !== count($meta['messages'])) {
        throw new RuntimeException("Message count mismatch for {$code}");
    }
    $html = [
        '●● Osteopathic Clinic' => $meta['clinic'],
        'Privacy Policy |  ●● Osteopathic Clinic' => $meta['privacy_title'],
        'Terms of Service |  ●● Osteopathic Clinic' => $meta['terms_title'],
        $LT_PRIVACY_EN => $meta['privacy_body'],
        $LT_TERMS_EN => $meta['terms_body'],
    ];
    foreach ($LT_HTML_KEYS as $i => $enKey) {
        $html[$enKey] = $meta['html'][$i];
    }
    $TRANSLATIONS[$code] = [
        'current_lang' => $meta['current_lang'],
        'rtl' => (bool) ($meta['rtl'] ?? ($code === 'ar')),
        'html' => $html,
        'messages' => array_combine($LT_MSG_KEYS, $meta['messages']),
    ];
}

// $TRANSLATIONS is built in lang_translations.php
