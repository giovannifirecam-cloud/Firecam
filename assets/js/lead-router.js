/**
 * FIRECAM LEAD ROUTER
 * Handles all lead-generation clicks, converting them into WhatsApp payloads.
 * Automatically captures UTM parameters (source, medium, campaign, content, term)
 * from the URL and appends them to the payload.
 */

// B.L.A.S.T: Single Source of Truth
const GLOBAL_WA_NUMBER = "5547996660234";

function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utms = {
        source: urlParams.get('utm_source'),
        medium: urlParams.get('utm_medium'),
        campaign: urlParams.get('utm_campaign'),
        content: urlParams.get('utm_content'),
        term: urlParams.get('utm_term'),
    };

    return Object.values(utms).some(Boolean) ? utms : null;
}

function formatUTMs(utms) {
    if (!utms) return "";

    let result = "\n\n--- Tracking Analytics ---\n";
    if (utms.source) result += `Source: ${utms.source}\n`;
    if (utms.medium) result += `Medium: ${utms.medium}\n`;
    if (utms.campaign) result += `Campaign: ${utms.campaign}\n`;
    if (utms.content) result += `Content: ${utms.content}\n`;
    if (utms.term) result += `Term: ${utms.term}\n`;

    return result;
}

function handleWhatsAppClick(e) {
    e.preventDefault();

    const button = e.currentTarget;
    const intentMessage = button.getAttribute('data-wa-message') || "Olá, gostaria de saber mais.";
    const utms = getUTMParameters();

    const finalMessage = `${intentMessage}${formatUTMs(utms)}`;
    const encodedText = encodeURIComponent(finalMessage);

    const url = `https://api.whatsapp.com/send?phone=${GLOBAL_WA_NUMBER}&text=${encodedText}`;

    window.open(url, '_blank', 'noopener,noreferrer');
}

// Initialize listeners on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const waTriggers = document.querySelectorAll('[data-wa-trigger="true"]');

    waTriggers.forEach(button => {
        button.addEventListener('click', handleWhatsAppClick);
        // Accessibility fallback: removing href but maintaining keyboard tab focus
        button.removeAttribute('href');
        button.setAttribute('role', 'link');
        button.setAttribute('tabindex', '0');

        // Allow enter/space to trigger keyboard
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleWhatsAppClick(e);
            }
        });
    });
});
