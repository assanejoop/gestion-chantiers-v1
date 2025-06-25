// // models/inventory.model.ts
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { CreateMaterialRequest } from './Materials';

// export class InventoryModel {
//   static createForm(): FormGroup {
//     return new FormGroup({
//       label: new FormControl('', [Validators.required, Validators.minLength(2)]),
//       quantity: new FormControl(1, [Validators.required, Validators.min(0)]),
//       criticalThreshold: new FormControl(0, [Validators.required, Validators.min(0)]),
//       unitId: new FormControl(null, [Validators.required]),
//       propertyId: new FormControl(null, [Validators.required])
//     });
//   }

//   static fromForm(form: FormGroup): CreateMaterialRequest {
//     return {
//       label: form.get('label')?.value,
//       quantity: form.get('quantity')?.value,
//       criticalThreshold: form.get('criticalThreshold')?.value,
//       unitId: form.get('unitId')?.value,
//       propertyId: form.get('propertyId')?.value,
      
//     };
//   }
// }