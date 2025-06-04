"use client";

import { useState } from "react";
import PageTitle from "@/components/PageTitle";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { addLocale } from "primereact/api";
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";

// Event type definition
type Event = {
  id: number;
  title: string;
  location: string;
  time: string;
  color: "red" | "blue" | "orange";
};

// Category type
type Category = "Klettern" | "Schwimmen" | "Joggen";

// Difficulty type
type Difficulty = "Anfänger freundlich" | "mittel" | "fortgeschritten";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [menuVisible, setMenuVisible] = useState<Record<number, boolean>>({});
  const [showEventDialog, setShowEventDialog] = useState(false);

  // Form states
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  // Add German locale for month names
  addLocale("de", {
    firstDayOfWeek: 1,
    dayNames: [
      "Sonntag",
      "Montag",
      "Dienstag",
      "Mittwoch",
      "Donnerstag",
      "Freitag",
      "Samstag",
    ],
    dayNamesShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    dayNamesMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    monthNames: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ],
    today: "Heute",
    clear: "Löschen",
  });

  // Sample events
  const events: Event[] = [
    {
      id: 1,
      title: "Tiger Mountain Trail Ride",
      location: "Nürnberg",
      time: "10:00-13:00",
      color: "red",
    },
    {
      id: 2,
      title: "Tiger Mountain Trail Ride",
      location: "Nürnberg",
      time: "10:00-13:00",
      color: "blue",
    },
    {
      id: 3,
      title: "Tiger Mountain Trail Ride",
      location: "Nürnberg",
      time: "10:00-13:00",
      color: "orange",
    },
  ];

  const toggleMenu = (id: number) => {
    setMenuVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openEventDialog = () => {
    setShowEventDialog(true);
  };

  const closeEventDialog = () => {
    setShowEventDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setEventName("");
    setEventDescription("");
    setEventDate(null);
    setStartTime(null);
    setEndTime(null);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
  };

  const saveEvent = () => {
    // Here you would save the event data
    console.log({
      name: eventName,
      description: eventDescription,
      date: eventDate,
      startTime,
      endTime,
      category: selectedCategory,
      difficulty: selectedDifficulty,
    });

    closeEventDialog();
  };

  return (
    <div className="pb-20">
      <PageTitle title="Calendar" />
      <div className="px-4">
        <div className="flex flex-col items-center">
          <Calendar
            inline
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            className="w-full"
            monthNavigator
            yearNavigator
            yearRange="2024:2030"
            style={{ border: "none" }}
            showButtonBar={false}
            locale="de"
            dateFormat="mm/dd/yy"
            nextIcon="pi pi-chevron-right"
            prevIcon="pi pi-chevron-left"
          />

          <div className="w-full mt-4">
            <Button
              label="Event erstellen"
              icon="pi pi-plus"
              className="w-full mb-6"
              style={{
                backgroundColor: "#1f2937",
                borderRadius: "0.5rem",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "1rem",
              }}
              iconPos="left"
              onClick={openEventDialog}
            />

            {/* Event list */}
            <div className="flex flex-col">
              {events.map((event) => (
                <div key={event.id} className="relative">
                  <div className="flex justify-between mt-6 mb-2 ml-2">
                    <div className="flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full mr-3 ${
                          event.color === "red"
                            ? "bg-red-300"
                            : event.color === "blue"
                            ? "bg-blue-300"
                            : "bg-orange-300"
                        }`}
                      />
                      <div className="text-gray-500 text-lg font-normal">
                        {event.time}
                      </div>
                    </div>

                    {/* Menu button positioned absolutely */}
                    <div className="">
                      <Button
                        icon="pi pi-ellipsis-v"
                        rounded
                        text
                        severity="secondary"
                        onClick={() => toggleMenu(event.id)}
                        aria-label="Options"
                        style={{ color: "#6b7280" }}
                      />
                    </div>
                  </div>

                  {/* Event details below time */}
                  <div className="ml-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-gray-500">
                      <i
                        className="pi pi-map-marker mr-1"
                        style={{ fontSize: "1rem" }}
                      />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Creation Sidebar */}
      <Sidebar
        visible={showEventDialog}
        onHide={closeEventDialog}
        position="bottom"
        className="p-0"
        style={{
          height: "90vh",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
        showCloseIcon={false}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Event erstellen</h2>
            <Button
              icon="pi pi-times"
              rounded
              text
              aria-label="Close"
              onClick={closeEventDialog}
              className="p-button-rounded p-button-text"
            />
          </div>

          <div className="mb-4">
            <InputText
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Event Name*"
              className="w-full p-3"
            />
          </div>

          <div className="mb-4">
            <InputTextarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              placeholder="Beschreibe das Event..."
              className="w-full p-3"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <Calendar
              value={eventDate}
              onChange={(e) => setEventDate(e.value as Date)}
              placeholder="Datum"
              showIcon
              className="w-full"
              iconPos="right"
            />
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Calendar
                value={startTime}
                onChange={(e) => setStartTime(e.value as Date)}
                placeholder="Start"
                timeOnly
                showIcon
                className="w-full"
                iconPos="right"
              />
            </div>
            <div className="flex-1">
              <Calendar
                value={endTime}
                onChange={(e) => setEndTime(e.value as Date)}
                placeholder="Ende"
                timeOnly
                showIcon
                className="w-full"
                iconPos="right"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg mb-3">Wähle eine Chategorie</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <RadioButton
                  inputId="klettern"
                  name="category"
                  value="Klettern"
                  onChange={(e) => setSelectedCategory(e.value)}
                  checked={selectedCategory === "Klettern"}
                />
                <label htmlFor="klettern" className="ml-2">
                  Klettern
                </label>
              </div>
              <div className="flex items-center">
                <RadioButton
                  inputId="schwimmen"
                  name="category"
                  value="Schwimmen"
                  onChange={(e) => setSelectedCategory(e.value)}
                  checked={selectedCategory === "Schwimmen"}
                />
                <label htmlFor="schwimmen" className="ml-2">
                  Schwimmen
                </label>
              </div>
              <div className="flex items-center">
                <RadioButton
                  inputId="joggen"
                  name="category"
                  value="Joggen"
                  onChange={(e) => setSelectedCategory(e.value)}
                  checked={selectedCategory === "Joggen"}
                />
                <label htmlFor="joggen" className="ml-2">
                  Joggen
                </label>
              </div>
              <Button icon="pi pi-plus" rounded text className="ml-auto" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg mb-3">Schwierigkeitsgrad</h3>
            <div className="flex gap-3">
              <Button
                label="Anfänger freundlich"
                className={`flex-1 p-button-outlined ${
                  selectedDifficulty === "Anfänger freundlich"
                    ? "bg-blue-100 text-blue-800 border-blue-300"
                    : ""
                }`}
                onClick={() => setSelectedDifficulty("Anfänger freundlich")}
              />
              <Button
                label="mittel"
                className={`flex-1 p-button-outlined ${
                  selectedDifficulty === "mittel"
                    ? "bg-orange-100 text-orange-800 border-orange-300"
                    : ""
                }`}
                onClick={() => setSelectedDifficulty("mittel")}
              />
              <Button
                label="fortgeschritten"
                className={`flex-1 p-button-outlined ${
                  selectedDifficulty === "fortgeschritten"
                    ? "bg-red-100 text-red-800 border-red-300"
                    : ""
                }`}
                onClick={() => setSelectedDifficulty("fortgeschritten")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-8">
            <Button
              label="Abbrechen"
              className="p-button-outlined w-full"
              onClick={closeEventDialog}
            />
            <Button
              label="Speichern"
              className="w-full"
              style={{ backgroundColor: "#1f2937", border: "none" }}
              onClick={saveEvent}
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
