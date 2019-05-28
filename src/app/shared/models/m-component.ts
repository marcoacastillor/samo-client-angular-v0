import { Option } from "./option";

export class MComponent {
    public pk_id_component: number;
    public fk_id_module: number;
    public name: string;
    public url_image: string;
    public url_angular_component: string;
    public display_user: string;
    
    /**
     * Listado de opciones
     */
    public options: Option[];
}
