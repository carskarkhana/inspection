import React  from "react";
import formStore from "@/store/formStore";
 
import damageStore from "@/store/damageStore";
 
import { DamagesPopup } from "./helper/damages-comp-popups/DamagesPopup";
import { ImageUploader2 } from "./helper/damages-comp-popups/ImageUploader2";

const Damages = () => {
    // const { formValues, setFormValues } = formStore();
    const { checkedItems, setCheckedItems } = damageStore();

    return (
        <section>
            <div className="mb-3 mx-1">
                <label
                    htmlFor="city"
                    className="block ml-1 mb-1 text-sm font-medium text-gray-900  "
                >
                    select damages
                </label>
                <div className="w-full flex jusify-evenly items-center gap-2">
                    <div className="rounded-md w-[100%] border border-gray-300 mx-auto ">
                        <DamagesPopup
                            checkedItems={checkedItems}
                            setCheckedItems={setCheckedItems}
                        />
                    </div>
                </div>
            </div>
            <p className="block ml-1 mb-1 text-sm font-medium text-gray-900  ">
                select damages
            </p>
            <div className="flex  bg-gray-100 px-1 w-full items-center gap-5 overflow-scroll">
                {checkedItems.map((item, index) => (
                    <div key={index}>
                        {" "}
                        <ImageUploader2 index={index} item={item} />
                        {/* <subDamagePopup selectedDamage={checkedItems} /> */}
                    </div>
                ))}
            </div>
            <button></button>
        </section>
    );
};

export default Damages;
