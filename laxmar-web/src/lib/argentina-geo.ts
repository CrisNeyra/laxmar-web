export type GeoOption = {
  id: string;
  nombre: string;
};

type GeorefListResponse<T> = {
  provincias?: T[];
  localidades?: T[];
};

const GEOREF_BASE = "https://apis.datos.gob.ar/georef/api";

const provincesCache: { data: GeoOption[] | null; promise: Promise<GeoOption[]> | null } =
  { data: null, promise: null };

const localitiesCache = new Map<string, GeoOption[]>();
const localitiesPromises = new Map<string, Promise<GeoOption[]>>();

function sortByName(items: GeoOption[]): GeoOption[] {
  return [...items].sort((a, b) =>
    a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }),
  );
}

async function fetchGeoref<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`GeoRef error ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchProvinces(): Promise<GeoOption[]> {
  if (provincesCache.data) return provincesCache.data;
  if (provincesCache.promise) return provincesCache.promise;

  provincesCache.promise = (async () => {
    const data = await fetchGeoref<GeorefListResponse<GeoOption>>(
      `${GEOREF_BASE}/provincias?campos=id,nombre&max=50`,
    );
    const provinces = sortByName(data.provincias ?? []);
    provincesCache.data = provinces;
    return provinces;
  })().finally(() => {
    provincesCache.promise = null;
  });

  return provincesCache.promise;
}

export async function fetchLocalities(provinceId: string): Promise<GeoOption[]> {
  if (!provinceId) return [];

  const cached = localitiesCache.get(provinceId);
  if (cached) return cached;

  const inflight = localitiesPromises.get(provinceId);
  if (inflight) return inflight;

  const promise = (async () => {
    const data = await fetchGeoref<GeorefListResponse<GeoOption>>(
      `${GEOREF_BASE}/localidades?provincia=${encodeURIComponent(provinceId)}&campos=id,nombre&max=5000&orden=nombre`,
    );
    const localities = sortByName(data.localidades ?? []);
    localitiesCache.set(provinceId, localities);
    return localities;
  })().finally(() => {
    localitiesPromises.delete(provinceId);
  });

  localitiesPromises.set(provinceId, promise);
  return promise;
}

export function formatTripLeg(provinceName: string, localityName: string): string {
  if (localityName && provinceName) return `${localityName}, ${provinceName}`;
  return localityName || provinceName;
}

export function formatOriginDestination(
  originProvince: string,
  originLocality: string,
  destinationProvince: string,
  destinationLocality: string,
): string {
  const origin = formatTripLeg(originProvince, originLocality);
  const destination = formatTripLeg(destinationProvince, destinationLocality);
  if (!origin || !destination) return "";
  return `${origin} → ${destination}`;
}
