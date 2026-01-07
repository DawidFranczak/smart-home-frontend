import usePrefetchDeviceQuery from "../hooks/queries/device/usePrefetchDeviceQuery.tsx";
import usePrefetchRoomQuery from "../hooks/queries/room/usePrefetchRoomQuery.tsx";
import useFirmwareDeviceQuery from "../hooks/queries/useFirmwareDeviceQuery.tsx";
import useFavouriteQuery from "../hooks/queries/useFavouriteQuery.tsx";

export default function DataPrefetcher() {
    const {  } = usePrefetchDeviceQuery()
    const {  } = usePrefetchRoomQuery()
    const {  } = useFirmwareDeviceQuery()
    const {  } = useFavouriteQuery()

    return null;
}