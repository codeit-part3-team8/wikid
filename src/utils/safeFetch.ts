// fetch 요청을 안전하게 수행하며, 실패 시 서버/클라이언트용 에러 메세지를 구분하여 처리

export async function safeFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    throw new Error('Server request failed');
  }
}
