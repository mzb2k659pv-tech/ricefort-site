/* Customer-facing flow only; no network or submission actions. */
(() => {
  const q = s => document.querySelector(s);
  const text = (s, value) => { const el=q(s); if(el) el.textContent=value; };
  text('.step[data-page="2"] strong','修改尺寸及配置');
  text('.step.customer-only strong','確認設計及要求報價');
  text('#title2','調整尺寸，即時看效果。');
  text('#step1 .hero p:not(.eyebrow)','先選擇一款接近你需要的傢俬，下一步可調整尺寸及配置。');
  text('#step1 .note .customer-only','款式是可調整的設計範本。選擇後按「下一步」，即可修改尺寸及配置。');
  text('[data-camera="iso"]','立體');
  text('.preview-caption span:last-child','拖動圖片可轉動傢俬；＋／－可縮放');
  text('.preview-note','效果圖僅供設計參考，顏色、結構及實際製作須由 RiceFort 確認。');
  text('.finish-setting > summary','02　顏色及表面處理');
  text('.standard-board strong','稻築板原色');
  text('.standard-board small','保留材料原本的質感，亦可選擇透明保護油或調色處理。');
  text('label[for="f-surface"]','表面處理');
  ['原色・標準處理','原色・透明保護油','調色處理'].forEach((v,i)=>q('#f-surface').options[i].textContent=v);
  text('#f-surface + small','選擇其他顏色時，會自動改為調色處理。');
  text('.finish-setting > p.note','螢幕顏色僅供參考，實際顏色請以材料樣板為準。');
  text('#frontField small','掩門向外打開；趟門左右滑動。選擇後會即時更新效果。');
  text('#titleCustomer3','確認設計及要求報價');
  text('#customerStep3 .page-heading p:last-child','先核對設計及聯絡資料，再傳送報價要求。按下傳送後，RiceFort 將收到你的設計及聯絡資料。');
  text('#customerStep3 .card > p.note','此設計為效果示意，實際製作及報價須由 RiceFort 確認。');
  text('label[for="requestName"]','姓名 *');
  text('label[for="requestContact"]','電話或電郵 *');
  text('#customerStep3 .request-actions + p','傳送內容包括聯絡資料、完整設計摘要及可還原設計的文字資料，經 Formspree 處理並通知 info@ricefort.com。不包含圖片附件；可先儲存預覽圖片，待 RiceFort 聯絡時補充。');
  text('[data-action="import"]','載入已儲存設計');
  text('[data-action="png"]','儲存圖片');
  q('#caseControls').open=true;
  // Less-used controls remain available, but are not part of the default flow.
  const advanced=document.createElement('details');
  advanced.className='card setting';advanced.id='advancedSettings';
  advanced.innerHTML='<summary>進階設定（可選）</summary><p class="note">不確定時可保留預設，之後由 RiceFort 協助確認。</p>';
  q('.reset-design').before(advanced);
  ['#baseControls','.inspection','.finish-setting .reference-notes:not(.internal-only)','#scopeField'].forEach(s=>{const el=q(s);if(el)advanced.append(el);});
  const mobile=document.createElement('button');mobile.type='button';mobile.className='btn rf-view-effect';mobile.textContent='↑ 查看即時效果';
  mobile.onclick=()=>q('.preview-card').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  q('#settings').append(mobile);
  const edits=document.createElement('div');edits.className='row rf-review-edits';
  [['修改款式','1'],['修改尺寸','2'],['修改顏色','2'],['修改配置','2']].forEach(([label,page],i)=>{
    const b=document.createElement('button');b.className='btn small';b.textContent=label;b.dataset.page=page;
    if(i>0)b.addEventListener('click',()=>requestAnimationFrame(()=>{const el=q(i===1?'#f-w':i===2?'#f-surface':'#caseControls');for(let p=el;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;el.scrollIntoView({block:'center'});el.focus({preventScroll:true});}));
    edits.append(b);
  });
  q('#customerReviewDescription').parentElement.parentElement.after(edits);
  const tools=document.createElement('details');tools.className='reference-notes';tools.innerHTML='<summary>儲存及複製設計（可選）</summary>';
  q('.request-actions').after(tools);
  q('.request-actions').querySelectorAll('button:not([data-action="sendRequest"])').forEach(el=>tools.append(el));
  const send=q('[data-action="sendRequest"]');send.textContent='傳送報價要求';
  q('#customerRequestStatus').setAttribute('role','status');
  q('#customerRequestStatus').setAttribute('aria-live','polite');
  text('.request-confirm span','我已核對設計，並同意將以上聯絡資料及設計經 Formspree 傳送至 RiceFort，以跟進報價。');
  // Validate on leaving a contact field, without submitting or sharing anything.
  ['requestName','requestContact'].forEach(id=>q('#'+id).addEventListener('blur',()=>{
    const field=q('#'+id),value=field.value.trim();
    const message=!value?(id==='requestName'?'請填寫姓名。':'請填寫電話或電郵。'):
      id==='requestContact'&&!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)||/^\+?[\d ()-]{8,20}$/.test(value))?'請輸入有效的電話或電郵，例如 9123 4567 或 name@example.com。':'';
    const hint=q('#err-'+id);hint.textContent=message;hint.hidden=!message;
    if(message)field.setAttribute('aria-invalid','true');else field.removeAttribute('aria-invalid');
  }));
})();
