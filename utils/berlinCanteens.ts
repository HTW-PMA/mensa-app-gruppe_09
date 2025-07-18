// utils/berlinCanteens.ts
// Liste aller Berliner Mensen mit Name, ID und Adresse

export type BerlinCanteen = {
  id: string;
  name: string;
  address: string;

};

export const berlinCanteens: BerlinCanteen[] = [
  {
    id: '1',
    name: 'Mensa HTW Wilhelminenhof',
    address: 'Wilhelminenhofstraße 75A, 12459 Berlin',
  },
  {
    id: '6',
    name: 'Mensa HTW Treskowallee',
    address: 'Treskowallee 8, 10318 Berlin',
  },
  {
    id: '2',
    name: 'Mensa TU Hardenbergstraße',
    address: 'Hardenbergstraße 34, 10623 Berlin',
  },
  {
    id: '3',
    name: 'Mensa FU Rost- und Silberlaube',
    address: 'Otto-von-Simson-Straße 26, 14195 Berlin',
  },
  {
    id: '4',
    name: 'Mensa HU Nord',
    address: 'Haus 18, Philippstraße 13, 10115 Berlin',
  },
  {
    id: '5',
    name: 'Mensa Beuth Hochschule',
    address: 'Luxemburger Straße 10, 13353 Berlin',
  },
  // ...weitere Mensen können hier ergänzt werden
];
