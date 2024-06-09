export type Cryptocurrency = {
  display_name: string;
  quote_currency: string;
  base_currency: string;
};

export type DataProps = {
  currencies: Array<Cryptocurrency>;
  pair: string;
  price: string;
  historical: Array<Array<number>> | undefined;
};
