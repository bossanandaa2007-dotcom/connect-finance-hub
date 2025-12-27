import React from "react";

type Country = {
  code: string;
  dial: string;
  flag: string;
  name: string;
};

const COUNTRIES: Country[] = [
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
  { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "RU", dial: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "ZA", dial: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "NG", dial: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "KE", dial: "+254", flag: "🇰🇪", name: "Kenya" },
];

interface Props {
  value: string;
  onChange: (val: string) => void;
}

const CountryPicker: React.FC<Props> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 rounded-lg border px-3 bg-background text-sm w-[140px]"
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.dial}>
          {c.flag} {c.dial}
        </option>
      ))}
    </select>
  );
};

export default CountryPicker;
