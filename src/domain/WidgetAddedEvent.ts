import { RepositoryWidget } from "./RepositoryWidget";
import { EventFactory } from "./EventFactory";


export const WidgetAddedEvent = new EventFactory<RepositoryWidget>().create("widget-added");
