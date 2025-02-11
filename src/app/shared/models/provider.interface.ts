export interface CategoryProvider {
  name: string;
  providers: Provider[];
}

export interface Provider {
  name: string;
  image: string;
}
