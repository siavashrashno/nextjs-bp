export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || "";
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};
interface EventProps {
  action: string;
  category: string;
  label: string;
  value?: number;
  non_interaction?: boolean;
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
  non_interaction,
}: EventProps) => {
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction,
    });
  }
};

// export const pageview = (url) => {
//   window.dataLayer.push({
//     event: "pageview",
//     page: url,
//   });
// };
