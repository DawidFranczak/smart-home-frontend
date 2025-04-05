export default interface IEvent {
  id: number;
  device: string;
  event: string;
  action: string;
  extra_settings: object;
  target_device: number;
}
