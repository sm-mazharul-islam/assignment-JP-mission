import { ImpactStats } from "../impactStats/ImpactStats";
import { Inventory } from "../inventoryStatus/InventoryStatus";
import { KitBuilder } from "../kitBuilder/KitBuilder";

export default function ImpactHome() {
  return (
    <div>
      <ImpactStats />

      <KitBuilder />
      <Inventory />
    </div>
  );
}
