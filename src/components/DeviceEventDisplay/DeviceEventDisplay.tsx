interface IDeviceEventProps {
  action: string;
  device: string;
  event: string;
}
export default function DeviceEventDisplay({
  action,
  device,
  event,
}: IDeviceEventProps) {
  return (
    <span>
      {event}-{action}-{device}
    </span>
  );
}
