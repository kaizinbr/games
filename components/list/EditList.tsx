import { List } from "@/utils/types";

export default function EditList({ list }: { list: List }){

    return (
        <div>Edit List Form - {list.name}</div>
    )
}