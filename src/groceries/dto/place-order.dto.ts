export class PlaceOrderDto {
  items: {
    groceryId: number;
    quantity: number;
  }[];
}
