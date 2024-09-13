"use client";
import React, { useState } from "react";

interface FilterOption {
  id: string;
  name: string;
}

const SidebarFilter: React.FC = () => {
  const [onlineEvent, setOnlineEvent] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<string>("Semua Lokasi");
  const [selectedFormat, setSelectedFormat] = useState<string>("Semua Format");
  const [selectedTopic, setSelectedTopic] = useState<string>("Semua Topik");
  const [selectedTime, setSelectedTime] = useState<string>("Semua Waktu");
  const [selectedPrice, setSelectedPrice] = useState<string>("Berbayar");

  const locations: FilterOption[] = [
    { id: "all-location", name: "Semua Lokasi" },
    { id: "1", name: "Bali" },
    { id: "78", name: "Bandung" },
    { id: "6", name: "DKI Jakarta" },
    { id: "37", name: "Kota Yogyakarta" },
    { id: "159", name: "Surabaya" },
  ];

  const formats: FilterOption[] = [
    { id: "all-format", name: "Semua Format" },
    { id: "2", name: "Festival, Fair, Bazaar" },
    { id: "3", name: "Konser" },
    { id: "4", name: "Pertandingan" },
    { id: "5", name: "Exhibition, Expo, Pameran" },
    { id: "6", name: "Konferensi" },
    { id: "7", name: "Workshop" },
  ];

  const topics: FilterOption[] = [
    { id: "all-topic", name: "Semua Topik" },
    { id: "1", name: "Anak, Keluarga" },
    { id: "2", name: "Bisnis" },
    { id: "3", name: "Desain, Foto, Video" },
    { id: "4", name: "Fashion, Kecantikan" },
  ];

  const times: FilterOption[] = [
    { id: "today", name: "Hari Ini" },
    { id: "tomorrow", name: "Besok" },
    { id: "this-weekend", name: "Akhir Pekan" },
    { id: "this-week", name: "Minggu Ini" },
    { id: "next-week", name: "Minggu Depan" },
  ];

  const prices: FilterOption[] = [
    { id: "all-price", name: "Semua Harga" },
    { id: "1", name: "Berbayar" },
    { id: "0", name: "Gratis" },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold">Filter</div>
        <a className="text-blue-500 hover:underline" href="/discover">
          <i className="fas fa-sync-alt"></i>
        </a>
      </div>

      <div className="space-y-4">
        {/* Event Online */}
        <div className="flex justify-between items-center">
          <div>Event Online</div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={onlineEvent}
              onChange={() => setOnlineEvent(!onlineEvent)}
            />
            <span className="ml-2">Online</span>
          </label>
        </div>

        {/* Location Filter */}
        <Accordion
          title="Lokasi"
          value={selectedLocation}
          onSelect={(value) => setSelectedLocation(value)}
          options={locations}
        />

        {/* Format Filter */}
        <Accordion
          title="Format"
          value={selectedFormat}
          onSelect={(value) => setSelectedFormat(value)}
          options={formats}
        />

        {/* Topic Filter */}
        <Accordion
          title="Topik"
          value={selectedTopic}
          onSelect={(value) => setSelectedTopic(value)}
          options={topics}
        />

        {/* Time Filter */}
        <Accordion
          title="Waktu"
          value={selectedTime}
          onSelect={(value) => setSelectedTime(value)}
          options={times}
        />

        {/* Price Filter */}
        <Accordion
          title="Harga"
          value={selectedPrice}
          onSelect={(value) => setSelectedPrice(value)}
          options={prices}
        />
      </div>
    </div>
  );
};

interface AccordionProps {
  title: string;
  value: string;
  onSelect: (value: string) => void;
  options: FilterOption[];
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  value,
  onSelect,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2">
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium">{title}</div>
        <div className="text-gray-500">{value}</div>
      </div>
      {isOpen && (
        <div className="mt-2">
          <ul className="space-y-1">
            {options.map((option) => (
              <li
                key={option.id}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                onClick={() => onSelect(option.name)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarFilter;
