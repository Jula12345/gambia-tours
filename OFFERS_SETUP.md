# PDF travel offers

## Vercel environment

Add OPENAI_API_KEY in the project's Settings > Environment Variables for Production. Keep it server-only. Redeploy after adding it. OPENAI_OFFER_MODEL is optional; the default is gpt-5.4-mini.

The existing ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET and connected private BLOB_READ_WRITE_TOKEN remain required for the admin panel and stored offers.

## Workflow

Each booking row has a Generate offer button. Choose a published trip, language and currency. Leave Include quotation unchecked for a price-free proposal, or enter a price per person. The group total is calculated from the request's guest count.

The editor uses the selected tour page's itinerary and inclusions, together with the submitted dates, pickup area and notes. Contact email and telephone are not included in the model prompt. Customer names are placed in the PDF by the template.

Generation uses one OpenAI Responses API call, reasoning disabled, with a maximum of 2,400 output tokens and strict structured output. At the model's documented rates of $0.75 per million input tokens and $4.50 per million output tokens, a typical compact proposal is approximately $0.01–$0.02. Actual cost depends on output length and input/revision size; the editor shows a usage-based estimate. Every revision is another billable generation.

Type changes into Instructions / changes and select Revise / regenerate. Every draft is saved privately as a separate version. Download the PDF and check it before sending it to a guest. There is no automatic customer email or image generation.

## Email delivery and duplicate enquiries

Website forms save the request through the API. If server email forwarding fails, the browser also sends it directly to info@gambiantour.com using FormSubmit AJAX. When direct delivery fails but the request is already saved, the guest still receives a received-request confirmation.

The main booking form closes and clears after success. Detail-page forms are replaced by a confirmation. The server compares the submitted booking fields with stored requests from the last ten minutes to avoid creating repeated entries, and coalesces concurrent identical requests in one server instance.

## Photos and fonts

PDF headers use locally bundled Wikimedia Commons photographs selected by trip category. Photographer and licence credits are printed in each PDF. Fonts are bundled under the Liberation Fonts licence included in assets/offers/fonts/LICENSE.txt.
