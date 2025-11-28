// fetch 요청을 안전하게 수행하며, 실패 시 서버/클라이언트용 에러 메세지를 구분하여 처리

export async function safeFetch(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);

    // 안전하게 fetch 요청 수행: 응답 상태 코드가 200~299(요청 성공)인지 확인
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
    console.error(err instanceof Error ? err.message : err); // 서버용 에러 메세지
    throw new Error('Server request failed'); // 클라이언트용 에러 메세지
  }
}
