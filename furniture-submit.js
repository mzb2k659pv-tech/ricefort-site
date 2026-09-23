/* Static-host-compatible submission. No credentials or internal pricing. */
window.RiceFortSubmit = async function(payload, fetcher = window.fetch.bind(window)) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetcher('https://formspree.io/f/myeyqldz', {
      method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json'},
      body:JSON.stringify(payload), signal:controller.signal
    });
    let result;
    try { result = await response.json(); } catch { result = null; }
    if(response.ok && result?.ok === true) return result;
    if(response.status === 429) throw new Error('提交次數已達服務限制。請稍後再試，或電郵 info@ricefort.com。');
    if(response.status === 400 || response.status === 422) throw new Error('表單未獲接納，請檢查聯絡資料；如仍失敗，請電郵 info@ricefort.com。');
    if(response.status === 401 || response.status === 403) throw new Error('提交驗證未能通過，請稍後再試，或電郵 info@ricefort.com。');
    throw new Error('未能確認提交成功，請先勿重複提交；可電郵 info@ricefort.com 查詢。');
  } catch(error) {
    if(error.name === 'AbortError' || error instanceof TypeError)
      throw new Error('連線中斷或逾時，未能確認是否已收件。資料仍然保留，請先電郵 info@ricefort.com 查詢，避免重複提交。');
    throw error;
  } finally { clearTimeout(timer); }
};
