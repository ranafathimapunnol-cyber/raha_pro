export type Amenity = {
  id: number;
  name: string;
};

export type Property = {
  id: number;
  title: string;
  city: string;
  description: string;
  rent: number;
  bedrooms: number;
  property_type: string;
  status: string;
  owner_id: number;
  amenities: Amenity[];
};

export type PropertyResponse = {
  items: Property[];
  meta: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
  };
};
