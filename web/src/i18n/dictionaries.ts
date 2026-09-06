export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  hi: "HI",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  hi: "हिन्दी",
};

const en = {
  meta: {
    title: "Kinnauri Apples | GI-tagged pre-booking from 9,000 ft",
  },
  header: {
    brand: "Kinnaur Apple",
    brandKicker: "GI · Kinnaur",
    journey: "The journey",
    facts: "GI & facts",
    prebook: "Pre-book",
    faq: "FAQ",
    contact: "Contact",
    cta: "Reserve a crate",
    language: "Language",
  },
  journey: {
    region: "Kinnaur · Himachal Pradesh",
    giBadge: "GI Tag Registered",
    reserve: "Reserve Your Box",
    chapters: "Story chapters",
    giStamp: "GI CERTIFIED",
    giStampSub: "Kinnauri Apple",
    stages: [
      {
        kicker: "Origin",
        title: "Grown at 9,000 ft.",
        italic: "Certified by geography.",
        body: "Kinnauri Apple is GI-tagged fruit of Kinnaur, Himachal Pradesh. Thin air, long sun, and a slow season on the branch — sold direct from orchard, not a wholesale yard.",
      },
      {
        kicker: "Orchard",
        title: "A 130–150 day hang",
        italic: "on the branch.",
        body: "Trees sit between 6,000 and 9,000 feet. Fruit stays on the limb for four to five months, building sugar and colour slowly. Altitude is the first grader.",
      },
      {
        kicker: "Harvest",
        title: "Picked by hand.",
        italic: "Never shaken.",
        body: "Crews inspect and twist each fruit. A bruise is a reject. Harvest is slow, selective, and done one apple at a time.",
      },
      {
        kicker: "Grade",
        title: "Size, colour, skin.",
        italic: "Then the GI mark.",
        body: "Grading looks at diameter, blush coverage and a blemish-free cuticle. The GI registration ties this apple’s character legally to Kinnaur.",
      },
      {
        kicker: "Pack",
        title: "Tissue-wrapped.",
        italic: "No middlemen.",
        body: "Selected fruit is wrapped, counted and packed at source. The crate you reserve is the crate that left the orchard.",
      },
      {
        kicker: "Hold",
        title: "Cold storage,",
        italic: "then the road.",
        body: "Crates rest in temperature-controlled rooms until dispatch. Freshness is a short orchard-to-doorstep window — not weeks in ambient transit.",
      },
      {
        kicker: "Peti",
        title: "5kg, 10kg or 15kg.",
        italic: "₹300/kg.",
        body: "The branded peti is the unit of sale. Price is ₹300 per kg, inclusive of packing. Pre-booking reserves quantity; it does not charge a card.",
      },
    ],
  },
  facts: {
    title: "Citable facts",
    altitude: "Altitude",
    hangTime: "On-tree cycle",
    origin: "Indication of origin",
    harvest: "Harvest window",
    crates: "Crate sizes",
    price: "Price anchor",
    altitudeValue: "6,000–9,000 ft",
    hangTimeValue: "130–150 days on the branch",
    originValue: "GI-tagged Kinnauri Apple, Kinnaur, Himachal Pradesh",
    harvestValue: "Late August–October",
    cratesValue: "5kg · 10kg · 15kg",
    priceValue: "₹300/kg, packing included",
  },
  booking: {
    kicker: "Pre-booking",
    title: "Reserve your crate",
    intro:
      "No payment on this form. We confirm harvest allocation, logistics and payment on a follow-up call or WhatsApp.",
    successTitle: "Request received.",
    successBody: "Our orchard desk will contact you on WhatsApp or phone.",
    fullName: "Full name",
    phone: "Phone number",
    email: "Email (optional)",
    pincode: "Pincode",
    city: "City (optional)",
    quantity: "Quantity",
    notes: "Notes (optional)",
    submit: "Submit Pre-Booking Request",
    submitting: "Submitting…",
    packs: {
      FIVE_KG: "5kg crate",
      TEN_KG: "10kg crate",
      FIFTEEN_KG: "15kg crate",
      custom: "Custom quantity",
    },
    errors: {
      name: "Please enter your full name.",
      phone: "Enter a valid 10-digit Indian mobile number.",
      pincode: "Pincode must be 6 digits.",
      network: "Network error. Please try again.",
    },
  },
  faq: {
    title: "Questions, answered",
    items: [
      {
        q: "What makes Kinnaur apples different?",
        a: "Kinnauri apples grow at 6,000–9,000 feet in the dry, high-altitude valleys of Kinnaur, Himachal Pradesh. The long 130–150 day hang-time on the tree concentrates sugars and colour. They are GI-tagged, hand-graded for size, blush and blemish, and packed orchard-direct without wholesale middlemen.",
      },
      {
        q: "Is this apple GI certified?",
        a: "Yes. Kinnauri Apple holds a Geographical Indication (GI) registration that ties the fruit to Kinnaur district, Himachal Pradesh. The GI mark is a legal indication of origin and typical quality — not a generic marketing label.",
      },
      {
        q: "Do you deliver pan-India?",
        a: "Pre-bookings are accepted from across India. Dispatch follows harvest and cold-storage packing. Delivery reach is confirmed on a call after you submit a request; remote pincodes are reviewed case by case.",
      },
      {
        q: "When is the harvest window?",
        a: "Kinnaur’s commercial apple harvest typically runs from late August through October, depending on altitude and variety. Fruit remains on the branch for 130–150 days before hand-picking.",
      },
      {
        q: "What box sizes can I reserve?",
        a: "Standard petis are 5kg, 10kg and 15kg. Custom quantities can be requested in the pre-booking form. Pricing is ₹300 per kg.",
      },
      {
        q: "Do I pay online when I pre-book?",
        a: "No. This site only captures a reservation request (name, phone, quantity, pincode). There is no payment gateway. A team member confirms availability, logistics and payment on WhatsApp or phone.",
      },
      {
        q: "How are apples graded and packed?",
        a: "Each fruit is inspected by hand for diameter, colour coverage and skin integrity. Selected apples are tissue-wrapped, packed into branded crates, and held in temperature-controlled storage until dispatch.",
      },
    ],
  },
  footer: {
    blurb:
      "GI-tagged Kinnauri apples from Kinnaur, Himachal Pradesh. Grown at 6,000–9,000 ft, hand-graded, packed orchard-direct.",
    email: "Aloknegi108@gmail.com",
    whatsapp: "WhatsApp: +91 7807821061",
    whatsappHref: "https://wa.me/917807821061",
  },
};

const hi: typeof en = {
  meta: {
    title: "किन्नौरी सेब | जीआई-टैग प्री-बुकिंग, 9,000 फीट की ऊँचाई से",
  },
  header: {
    brand: "किन्नौर एपल",
    brandKicker: "जीआई · किन्नौर",
    journey: "यात्रा",
    facts: "जीआई और तथ्य",
    prebook: "प्री-बुकिंग",
    faq: "प्रश्न",
    contact: "संपर्क",
    cta: "पेटी आरक्षित करें",
    language: "भाषा",
  },
  journey: {
    region: "किन्नौर · हिमाचल प्रदेश",
    giBadge: "जीआई टैग पंजीकृत",
    reserve: "अपनी पेटी आरक्षित करें",
    chapters: "कहानी के अध्याय",
    giStamp: "जीआई प्रमाणित",
    giStampSub: "किन्नौरी सेब",
    stages: [
      {
        kicker: "उत्पत्ति",
        title: "9,000 फीट पर उगाया।",
        italic: "भूगोल से प्रमाणित।",
        body: "किन्नौरी सेब हिमाचल प्रदेश के किन्नौर का जीआई-टैग फल है। पतली हवा, लंबी धूप और डाल पर धीमा मौसम — बाग से सीधे, थोक मंडी से नहीं।",
      },
      {
        kicker: "बाग",
        title: "130–150 दिन",
        italic: "डाल पर लटके।",
        body: "पेड़ 6,000 से 9,000 फीट के बीच हैं। फल चार से पाँच महीने डाल पर रहता है, धीरे-धीरे शर्करा और रंग बढ़ता है। ऊँचाई पहला ग्रेडर है।",
      },
      {
        kicker: "तुड़ाई",
        title: "हाथ से तोड़ा।",
        italic: "कभी नहीं हिलाया।",
        body: "टीम हर फल को देखकर मोड़ती है। चोट अस्वीकार है। तुड़ाई धीमी, चुनिंदा और एक-एक सेब से होती है।",
      },
      {
        kicker: "ग्रेड",
        title: "आकार, रंग, छिलका।",
        italic: "फिर जीआई चिह्न।",
        body: "ग्रेडिंग व्यास, ब्लश कवरेज और दाग-रहित छिलके पर होती है। जीआई पंजीकरण इस सेब के चरित्र को कानूनी रूप से किन्नौर से जोड़ता है।",
      },
      {
        kicker: "पैकिंग",
        title: "टिशू में लिपटा।",
        italic: "बिना बिचौलिये।",
        body: "चुने हुए फल स्रोत पर लपेटे, गिने और पैक किए जाते हैं। जो पेटी आप आरक्षित करते हैं, वही बाग से निकलती है।",
      },
      {
        kicker: "भंडारण",
        title: "कोल्ड स्टोरेज,",
        italic: "फिर सड़क।",
        body: "पेटियाँ डिस्पैच तक तापमान-नियंत्रित कमरों में रहती हैं। ताजगी बाग-से-दरवाजे की छोटी खिड़की है — हफ्तों की सामान्य ढुलाई नहीं।",
      },
      {
        kicker: "पेटी",
        title: "5 किग्रा, 10 किग्रा या 15 किग्रा।",
        italic: "₹300/किग्रा।",
        body: "ब्रांडेड पेटी बिक्री की इकाई है। कीमत ₹300 प्रति किग्रा है, जिसमें पैकिंग शामिल है। प्री-बुकिंग मात्रा आरक्षित करती है; कार्ड से भुगतान नहीं लेती।",
      },
    ],
  },
  facts: {
    title: "उद्धरण योग्य तथ्य",
    altitude: "ऊँचाई",
    hangTime: "डाल पर चक्र",
    origin: "उत्पत्ति का संकेत",
    harvest: "तुड़ाई का समय",
    crates: "पेटी आकार",
    price: "मूल्य आधार",
    altitudeValue: "6,000–9,000 फीट",
    hangTimeValue: "डाल पर 130–150 दिन",
    originValue: "जीआई-टैग किन्नौरी सेब, किन्नौर, हिमाचल प्रदेश",
    harvestValue: "अगस्त के अंत से अक्टूबर",
    cratesValue: "5 किग्रा · 10 किग्रा · 15 किग्रा",
    priceValue: "₹300/किग्रा",
  },
  booking: {
    kicker: "प्री-बुकिंग",
    title: "अपनी पेटी आरक्षित करें",
    intro:
      "इस फॉर्म पर कोई भुगतान नहीं। फसल आवंटन, लॉजिस्टिक्स और भुगतान हम कॉल या व्हाट्सऐप पर पुष्टि करते हैं।",
    successTitle: "अनुरोध प्राप्त हुआ।",
    successBody: "हमारी बाग टीम आपसे व्हाट्सऐप या फोन पर संपर्क करेगी।",
    fullName: "पूरा नाम",
    phone: "फ़ोन नंबर",
    email: "ईमेल (वैकल्पिक)",
    pincode: "पिनकोड",
    city: "शहर (वैकल्पिक)",
    quantity: "मात्रा",
    notes: "नोट्स (वैकल्पिक)",
    submit: "प्री-बुकिंग अनुरोध भेजें",
    submitting: "भेजा जा रहा है…",
    packs: {
      FIVE_KG: "5 किग्रा पेटी",
      TEN_KG: "10 किग्रा पेटी",
      FIFTEEN_KG: "15 किग्रा पेटी",
      custom: "कस्टम मात्रा",
    },
    errors: {
      name: "कृपया अपना पूरा नाम लिखें।",
      phone: "मान्य 10 अंकों का भारतीय मोबाइल नंबर लिखें।",
      pincode: "पिनकोड 6 अंकों का होना चाहिए।",
      network: "नेटवर्क त्रुटि। कृपया फिर कोशिश करें।",
    },
  },
  faq: {
    title: "प्रश्न, उत्तर सहित",
    items: [
      {
        q: "किन्नौर के सेब अलग क्यों हैं?",
        a: "किन्नौरी सेब हिमाचल प्रदेश के किन्नौर की सूखी, ऊँचाई वाली घाटियों में 6,000–9,000 फीट पर उगते हैं। डाल पर 130–150 दिन रहने से शर्करा और रंग घना होता है। ये जीआई-टैग हैं, आकार, ब्लश और दाग के लिए हाथ से ग्रेड किए जाते हैं, और बिना थोक बिचौलिये के बाग से पैक होते हैं।",
      },
      {
        q: "क्या यह सेब जीआई प्रमाणित है?",
        a: "हाँ। किन्नौरी सेब का भौगोलिक संकेत (जीआई) पंजीकरण है, जो फल को किन्नौर जिला, हिमाचल प्रदेश से जोड़ता है। जीआई चिह्न उत्पत्ति और विशिष्ट गुणवत्ता का कानूनी संकेत है — सामान्य मार्केटिंग लेबल नहीं।",
      },
      {
        q: "क्या आप पूरे भारत में डिलीवरी करते हैं?",
        a: "प्री-बुकिंग पूरे भारत से स्वीकार हैं। डिस्पैच तुड़ाई और कोल्ड-स्टोरेज पैकिंग के बाद होता है। पहुँच आपके अनुरोध के बाद कॉल पर पुष्टि होती है; दूरस्थ पिनकोड मामले-दर-मामले देखे जाते हैं।",
      },
      {
        q: "तुड़ाई का समय कब है?",
        a: "किन्नौर की व्यावसायिक सेब तुड़ाई आमतौर पर अगस्त के अंत से अक्टूबर तक चलती है, ऊँचाई और किस्म पर निर्भर। हाथ से तोड़ने से पहले फल 130–150 दिन डाल पर रहता है।",
      },
      {
        q: "कौन-सी पेटी आकार आरक्षित कर सकता हूँ?",
        a: "मानक पेटियाँ 5 किग्रा, 10 किग्रा और 15 किग्रा हैं। कस्टम मात्रा प्री-बुकिंग फॉर्म में माँग सकते हैं। मूल्य ₹300 प्रति किग्रा है।",
      },
      {
        q: "प्री-बुकिंग पर क्या मैं ऑनलाइन भुगतान करता हूँ?",
        a: "नहीं। यह साइट केवल आरक्षण अनुरोध लेती है (नाम, फोन, मात्रा, पिनकोड)। कोई पेमेंट गेटवे नहीं है। टीम उपलब्धता, लॉजिस्टिक्स और भुगतान व्हाट्सऐप या फोन पर पुष्टि करती है।",
      },
      {
        q: "सेब कैसे ग्रेड और पैक होते हैं?",
        a: "हर फल का व्यास, रंग और छिलके की जाँच हाथ से होती है। चुने सेब टिशू में लपेटे जाते हैं, ब्रांडेड पेटियों में पैक होते हैं, और डिस्पैच तक तापमान-नियंत्रित भंडारण में रहते हैं।",
      },
    ],
  },
  footer: {
    blurb:
      "किन्नौर, हिमाचल प्रदेश के जीआई-टैग किन्नौरी सेब। 6,000–9,000 फीट पर उगे, हाथ से ग्रेड, बाग से सीधे पैक।",
    email: "Aloknegi108@gmail.com",
    whatsapp: "व्हाट्सऐप: +91 7807821061",
    whatsappHref: "https://wa.me/917807821061",
  },
};

export const dictionaries = { en, hi } as const;
export type Dictionary = typeof en;
