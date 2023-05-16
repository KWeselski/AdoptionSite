import {
  facebook,
  instagram,
  partner_1,
  partner_2,
  partner_3,
  partner_4,
  twitter,
  dog,
  cat,
  house,
} from "../assets";

export const navLinks = [
  {
    url: "how-helps",
    title: "How you can help?",
  },
  {
    url: "animals",
    title: "Animals for adoption",
  },
];

export const footerLinks = {
  contactInfo: {
    phoneNumber: "+48 123 456 789",
    email: "info@example.com",
    address: "ul. Przykładowa 1, Miasto",
  },
  sections: [
    {
      title: "Strona główna",
      link: "/",
    },
    {
      title: "Lista Zwierząt",
      link: "/lista-zwierzat",
    },
    {
      title: "Jak Adoptować",
      link: "/jak-adoptowac",
    },
    {
      title: "O Nas",
      link: "/o-nas",
    },
  ],
  privacyPolicyLink: "/polityka-prywatnosci",
  termsOfServiceLink: "/regulamin",
  socialMediaLinks: [
    {
      platform: "Facebook",
      icon: facebook,
      link: "https://www.facebook.com/example",
    },
    {
      platform: "Instagram",
      icon: instagram,
      link: "https://www.instagram.com/example",
    },
    {
      platform: "Twitter",
      icon: twitter,
      link: "https://www.twitter.com/example",
    },
  ],
  legalInfo: "© 2023 Przykładowa Organizacja. Wszelkie prawa zastrzeżone.",
  partners: ["Nazwa Partnera 1", "Nazwa Partnera 2", "Nazwa Partnera 3"],
  usefulLinks: [
    {
      title: "Schroniska dla Zwierząt",
      link: "https://www.example.com/schroniska",
    },
    {
      title: "Organizacje dobroczynne",
      link: "https://www.example.com/organizacje",
    },
    {
      title: "Strony o adopcji zwierząt",
      link: "https://www.example.com/adopcja",
    },
  ],
  copyrightInfo:
    "Wszystkie zdjęcia użyte na stronie są objęte prawami autorskimi.",
};

export const partners = [
  {
    image: partner_1,
    name: "Best Zoo",
  },
  {
    image: partner_2,
    name: "Best Zoo",
  },
  {
    image: partner_3,
    name: "Best Zoo",
  },
  {
    image: partner_4,
    name: "Best Zoo",
  },
];

export const statistics = [
  {
    icon: dog,
    title: "Dogs looking for a home",
  },
  {
    icon: cat,
    title: "Cats looking for a home",
  },
  {
    icon: house,
    title: "Animals adopted",
  },
];
