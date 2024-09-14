import React from "react";
import { ICategoryItem } from "@/interfaces/event.interface";

type Props = {
  categories: ICategoryItem[];
};
function EventFormHeader({ categories }: Props) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="border-dashed border-2 border-gray-300 p-6 text-center">
            <button className="text-blue-500">
              Unggah gambar/poster/banner
            </button>
            <p className="text-gray-500 mt-2 text-sm">
              Direkomendasikan 724 x 340px dan tidak lebih dari 2MB
            </p>
          </div>
        </div>
        <div className="mt-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Nama Event"
            className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            title="Pilih Kategori"
            defaultValue={""}
            className="w-full mt-3 border border-gray-300 p-3 rounded-md"
            required
          >
            <option value={""} disabled>
              Pilih Kategori
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default EventFormHeader;
