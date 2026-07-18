export const getClientOptions = (org: string, dept: string, subDept: string | null) => {
  // Default values
  let types = ['Recycler', 'Producer', 'Trader', 'Merchant', 'Industries'];
  let roles = ['Buyer', 'Seller'];

  if (dept === 'Government Services') {
    types = ['Municipalities', 'Industries', 'Societies'];
  } else if (org === 'Plastroots Waste Management & Solutions Private Limited' && dept === 'Corporate Compliance') {
    if (subDept === 'EPR Compliance' || !subDept) {
      types = ['Recyclers', 'Producers', 'Brandowners', 'Freelancers', 'Importers', 'Industries', 'Traders'];
    }
  } else if (org === 'Plastroots Foundation') {
    if (dept === 'CSR' || dept === 'IEC') {
      types = ['Government', 'PSU', 'Corporate', 'NGO/Trust/Foundation', 'International Agency', 'Educational Institution', 'Healthcare Institution', 'Community Organization', 'Local Body'];
    } else if (dept === 'RRC') {
      types = ['Recycler', 'Producer', 'Trader', 'Merchant', 'Industries'];
    }
  } else if (org === 'Geoclaim Energy Private Limited') {
    // PMS, Biogas, Biomass
    types = ['Traders', 'Industries', 'Municipal', 'hotels', 'Manufacturers'];
  } else if (org === 'Shetahit Farm Solutions Private Limited') {
    // MPD, FVF
    types = ['Traders', 'Industries', 'Municipal', 'hotels', 'Manufacturers'];
  } else if (org === 'Aayuneer Enterprises') {
    types = ['Traders', 'Industries', 'Municipal', 'hotels', 'Manufacturers', 'Events', 'Distributer'];
    roles = ['Manufacturer', 'Distributor'];
  }

  return { types, roles };
};
