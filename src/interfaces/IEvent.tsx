export default interface IEvent {
  id: number;
  device: string;
  event: string;
  action: string;
  target_device: number;
  extra_settings: object;
}
