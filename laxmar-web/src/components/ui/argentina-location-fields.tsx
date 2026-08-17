"use client";

import { useEffect, useId, useState } from "react";

import {
  fetchLocalities,
  fetchProvinces,
  type GeoOption,
} from "@/lib/argentina-geo";
import { cn } from "@/lib/utils";

type LocationValue = {
  provinceId: string;
  provinceName: string;
  localityId: string;
  localityName: string;
};

type ArgentinaLocationFieldsProps = {
  idPrefix: string;
  legend: string;
  value: LocationValue;
  onChange: (next: LocationValue) => void;
  error?: string;
  disabled?: boolean;
};

const selectClass =
  "flex h-11 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

export function ArgentinaLocationFields({
  idPrefix,
  legend,
  value,
  onChange,
  error,
  disabled,
}: ArgentinaLocationFieldsProps) {
  const reactId = useId();
  const provinceFieldId = `${idPrefix}-provincia-${reactId}`;
  const localityFieldId = `${idPrefix}-localidad-${reactId}`;

  const [provinces, setProvinces] = useState<GeoOption[]>([]);
  const [localities, setLocalities] = useState<GeoOption[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingLocalities, setLoadingLocalities] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingProvinces(true);
    fetchProvinces()
      .then((items) => {
        if (!cancelled) {
          setProvinces(items);
          setLoadError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("No pudimos cargar las provincias. Recargá la página.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingProvinces(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!value.provinceId) {
      setLocalities([]);
      return;
    }

    let cancelled = false;
    setLoadingLocalities(true);
    fetchLocalities(value.provinceId)
      .then((items) => {
        if (!cancelled) {
          setLocalities(items);
          setLoadError(null);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("No pudimos cargar las localidades. Probá de nuevo.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingLocalities(false);
      });

    return () => {
      cancelled = true;
    };
  }, [value.provinceId]);

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor={provinceFieldId} className="text-xs font-medium text-muted-foreground">
            Provincia
          </label>
          <select
            id={provinceFieldId}
            className={cn(selectClass, error && "border-red-500")}
            disabled={disabled || loadingProvinces}
            value={value.provinceId}
            onChange={(event) => {
              const provinceId = event.target.value;
              const province = provinces.find((item) => item.id === provinceId);
              onChange({
                provinceId,
                provinceName: province?.nombre ?? "",
                localityId: "",
                localityName: "",
              });
            }}
            aria-invalid={Boolean(error)}
          >
            <option value="">
              {loadingProvinces ? "Cargando provincias…" : "Seleccioná provincia"}
            </option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor={localityFieldId} className="text-xs font-medium text-muted-foreground">
            Localidad
          </label>
          <select
            id={localityFieldId}
            className={cn(selectClass, error && "border-red-500")}
            disabled={disabled || !value.provinceId || loadingLocalities}
            value={value.localityId}
            onChange={(event) => {
              const localityId = event.target.value;
              const locality = localities.find((item) => item.id === localityId);
              onChange({
                ...value,
                localityId,
                localityName: locality?.nombre ?? "",
              });
            }}
            aria-invalid={Boolean(error)}
          >
            <option value="">
              {!value.provinceId
                ? "Primero elegí provincia"
                : loadingLocalities
                  ? "Cargando localidades…"
                  : "Seleccioná localidad"}
            </option>
            {localities.map((locality) => (
              <option key={locality.id} value={locality.id}>
                {locality.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loadError && <p className="text-xs font-medium text-amber-700">{loadError}</p>}
      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export type { LocationValue };
