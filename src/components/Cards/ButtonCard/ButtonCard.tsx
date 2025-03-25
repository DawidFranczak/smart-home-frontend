interface IButtonCardProps {
  controlled_lamp: number;
  fun: string;
  id: number;
  ip: string;
  is_favourite: boolean;
  is_online: boolean;
  last_seen: string;
  mac: string;
  name: string;
  port: number;
  room: number;
}

export default function ButtonCard(button: IButtonCardProps) {
  return (
    <>
      <p>{button.name}</p>
    </>
  );
}
