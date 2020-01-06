export interface Reservation {
  idReservation?: number;
  idBeach?: number;
  date?: Date;
  name_reservation?: string;
  email?: string;
  mobile?: string;
  quantity?: number;
  half_day?: boolean;
  beach_name: string;   

  /* beach_name variable doesn't belong to the reservation's table, but we use it to store 
   * the beaches names in order to allow to the user to choice the beach by its name */
}

