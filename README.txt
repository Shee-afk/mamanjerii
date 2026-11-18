MAMA NJERI RESTAURANT WEBSITE
============================

FILES
-----
index.html     Main website page and content.
style.css      Colours, layout, typography and responsive design.
script.js      Menu search/filter, order basket and WhatsApp checkout.
assets/        Locally stored food photographs used by the website.

HOW TO OPEN
-----------
1. Extract the ZIP folder first (if it is still zipped).
2. Open the folder named mama_njeri_website.
3. Double-click index.html.
4. It should open in your default browser (Chrome or Microsoft Edge).
5. Select a menu category, search for a meal, add meals to your order and
   test the quantity buttons. The WhatsApp checkout opens a prepared message.

IMPORTANT CUSTOMISATIONS BEFORE PUBLISHING
------------------------------------------
1. Open script.js in Notepad or Visual Studio Code.
2. Find: const WHATSAPP_NUMBER = "254700000000";
3. Replace the sample number with the restaurant's real WhatsApp number.
   Use country code and digits only, for example 2547XXXXXXXX.
4. In index.html, replace the sample address, phone number, opening hours,
   menu items and prices with confirmed restaurant information.
5. Save the files and refresh index.html in your browser.

Do not move index.html away from style.css, script.js or the assets folder.
The website is a front-end demonstration. It does not process card payments,
store orders in a database, or automatically confirm delivery. Orders are
sent to WhatsApp for the restaurant to review and confirm.
