export type UserPackageResponse = {
  id: string;
  number_of_pax: number;
  transportation: string;
  flight: string;
  travel_duration: number;
  mekkah_duration: number;
  madinah_duration: number;
  hotel_mekkah: string;
  hotel_madinah: string;
  muthawif: string;
  handling: string;
  total_price: number;
  per_pax_price: number;
};

export type CreateUserPackageRequest = {
  number_of_pax: number;
  transportation_id: string;
  flight_id: string;
  travel_duration: number;
  mekkah_duration: number;
  madinah_duration: number;
  hotel_mekkah_id: string;
  hotel_madinah_id: string;
  muthawif_id: string;
  handling_id: string;
};
