import type { JobLocation } from "@/types/job-search";

export type PortalLocationMaps = {
  naukri: string;
  indeed: string;
  foundit: string;
  shine: string;
  instahyre: string;
  hirist: string;
  wellfound: string;
};

const LOCATION_PORTAL_SLUGS: Record<JobLocation, PortalLocationMaps> = {
  Bangalore: {
    naukri: "bangalore",
    indeed: "Bangalore, Karnataka",
    foundit: "Bengaluru / Bangalore",
    shine: "bangalore",
    instahyre: "bangalore",
    hirist: "bangalore",
    wellfound: "Bangalore",
  },
  Hyderabad: {
    naukri: "hyderabad",
    indeed: "Hyderabad, Telangana",
    foundit: "Hyderabad / Secunderabad",
    shine: "hyderabad",
    instahyre: "hyderabad",
    hirist: "hyderabad",
    wellfound: "Hyderabad",
  },
  Pune: {
    naukri: "pune",
    indeed: "Pune, Maharashtra",
    foundit: "Pune",
    shine: "pune",
    instahyre: "pune",
    hirist: "pune",
    wellfound: "Pune",
  },
  Mumbai: {
    naukri: "mumbai",
    indeed: "Mumbai, Maharashtra",
    foundit: "Mumbai",
    shine: "mumbai",
    instahyre: "mumbai",
    hirist: "mumbai",
    wellfound: "Mumbai",
  },
  Chennai: {
    naukri: "chennai",
    indeed: "Chennai, Tamil Nadu",
    foundit: "Chennai",
    shine: "chennai",
    instahyre: "chennai",
    hirist: "chennai",
    wellfound: "Chennai",
  },
  Delhi: {
    naukri: "delhi-ncr",
    indeed: "Delhi",
    foundit: "Delhi",
    shine: "delhi",
    instahyre: "delhi-ncr",
    hirist: "delhi",
    wellfound: "New Delhi",
  },
  Noida: {
    naukri: "noida",
    indeed: "Noida, Uttar Pradesh",
    foundit: "Noida",
    shine: "noida",
    instahyre: "noida",
    hirist: "noida",
    wellfound: "Noida",
  },
  Gurgaon: {
    naukri: "gurgaon",
    indeed: "Gurgaon, Haryana",
    foundit: "Gurgaon",
    shine: "gurgaon",
    instahyre: "gurgaon",
    hirist: "gurgaon-gurugram",
    wellfound: "Gurgaon",
  },
  Ahmedabad: {
    naukri: "ahmedabad",
    indeed: "Ahmedabad, Gujarat",
    foundit: "Ahmedabad",
    shine: "ahmedabad",
    instahyre: "ahmedabad",
    hirist: "ahmedabad",
    wellfound: "Ahmedabad",
  },
  "Gift City": {
    naukri: "gandhinagar",
    indeed: "Gandhinagar, Gujarat",
    foundit: "Gandhinagar",
    shine: "gandhinagar",
    instahyre: "gandhinagar",
    hirist: "gandhinagar",
    wellfound: "Gandhinagar",
  },
  Kolkata: {
    naukri: "kolkata",
    indeed: "Kolkata, West Bengal",
    foundit: "Kolkata",
    shine: "kolkata",
    instahyre: "kolkata",
    hirist: "kolkata",
    wellfound: "Kolkata",
  },
  Chandigarh: {
    naukri: "chandigarh",
    indeed: "Chandigarh",
    foundit: "Chandigarh",
    shine: "chandigarh",
    instahyre: "chandigarh",
    hirist: "chandigarh",
    wellfound: "Chandigarh",
  },
  Jaipur: {
    naukri: "jaipur",
    indeed: "Jaipur, Rajasthan",
    foundit: "Jaipur",
    shine: "jaipur",
    instahyre: "jaipur",
    hirist: "jaipur",
    wellfound: "Jaipur",
  },
  Kochi: {
    naukri: "kochi",
    indeed: "Kochi, Kerala",
    foundit: "Kochi",
    shine: "kochi",
    instahyre: "kochi",
    hirist: "cochin-kochi",
    wellfound: "Kochi",
  },
  Indore: {
    naukri: "indore",
    indeed: "Indore, Madhya Pradesh",
    foundit: "Indore",
    shine: "indore",
    instahyre: "indore",
    hirist: "indore",
    wellfound: "Indore",
  },
  "Remote India": {
    naukri: "india",
    indeed: "India",
    foundit: "India",
    shine: "all-india",
    instahyre: "remote",
    hirist: "india",
    wellfound: "India",
  },
};

export function pickPrimaryLocation(locations: JobLocation[]): JobLocation {
  if (locations.length === 0) return "Bangalore";
  const onSite = locations.filter((l) => l !== "Remote India");
  return onSite[0] ?? "Remote India";
}

export function getPortalLocations(location: JobLocation): PortalLocationMaps {
  return LOCATION_PORTAL_SLUGS[location];
}

export function slugifySegment(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
