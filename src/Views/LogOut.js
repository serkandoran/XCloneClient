import '../Styles/LogOut.css'




const LogOut = ()=>{






   const loginWithGoogle = ()=>{

   }


   return <div className="logout_container">
      <div className= "logout_container_inner">
         <div>
            <div className="logout_container_body">
               <div className="logout_container_body_left">
                  <div>
                     <svg viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                           <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </g>
                     </svg>
                  </div>
               </div>
               <div className="logout_container_body_right">
                  <div className="logout_container_body_right_inner">
                     <div className="suandaolupbitenler">
                        <span>Şu anda olup bitenler</span>
                     </div>
                     <div className="hemenkatil">
                        <span>Hemen Katıl.</span>
                     </div>
                     <div className="logout_right_inner_body">
                        <div style={{marginTop: '0px'}} onClick={loginWithGoogle} id="googleileoturumac">
                           <div id="google_svg_div">
                              <svg id="svg_google" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                 <g>
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path>
                                 </g>
                              </svg>
                           </div>
                           <span>Google ile kaydolun</span>
                        </div>
                        <div id="appleilegirisyap">
                           <div id="applegiris_div">
                              <svg id="svg_apple" viewBox="0 0 24 24" aria-hidden="true">
                                 <g>
                                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                                 </g>
                              </svg>
                              <span>Apple ile kaydol</span>
                           </div>
                        </div>
                        <div className="lo_veya">
                           <div>
                              <div className='lo_veya_left'>
                                 <div className="lo_veya_left_inner"></div>
                              </div>
                              <div id='veya_center'>
                                 <span id='veya_center_span'>
                                    <span id='veya_center_span_inner'>veya</span>
                                 </span>
                              </div>
                              <div className='lo_veya_left'>
                                 <div className="lo_veya_left_inner"></div>
                              </div>
                           </div>
                        </div>
                        <div className="lo_ileri" role='button'>
                           <div className="lo_ileri_inner">
                              <span>Hesap oluştur</span>
                           </div>
                        </div>
                        <div className="lo_policy_service_cookie">
                           <span>By signing up, you agree to the </span>
                           <span><a href="https://twitter.com/en/tos" target='_blank' rel='noreferrer'>Terms of Service</a></span>
                           <span> and </span>
                           <span><a href="https://twitter.com/en/privacy" target='_blank' rel='noreferrer'>Privacy Policy </a></span>
                           <span>,including </span>
                           <span><a href="https://help.twitter.com/tr/rules-and-policies/x-cookies" target='_blank' rel='noreferrer'> Cookie Use.</a></span>
                        </div>
                        <div className="zhv_gy">
                           <div className="lo_zaten_hesabin_var_mi">
                              <span>Zaten bir hesabın var mı? </span>
                           </div>
                           <div className="lo_giris_yap" role='button'>
                              <div className="lo_giris_yap_inner">
                                 <span>Giriş yap</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="logout_container_footer">
               <nav className='lo_footer_nav' aria-label='altbilgi' role='navigation'>
                  <a href="https://about.twitter.com/tr" target='_blank' rel='noreferrer'><span>Hakkında</span></a>
                  <a href="https://help.twitter.com/en/using-x/download-the-x-app" target='_blank' rel='noreferrer'><span>X uygulamasını indir</span></a>
                  <a href="https://help.twitter.com/tr" target='_blank' rel='noreferrer'><span>Yardım Merkezi</span></a>
                  <a href="https://twitter.com/en/tos" target='_blank' rel='noreferrer'><span>Hizmet Şartları</span></a>
                  <a href="https://twitter.com/en/privacy" target='_blank' rel='noreferrer'><span>Gizlilik Politikası</span></a>
                  <a href="https://help.twitter.com/tr/rules-and-policies/x-cookies" target='_blank' rel='noreferrer'><span>Çerez Politikası</span></a>
                  <a href="https://legal.twitter.com/tr/imprint" target='_blank' rel='noreferrer'><span>Imprint</span></a>
                  <a href="https://help.twitter.com/tr/resources/accessibility" target='_blank' rel='noreferrer'><span>Erişilebilirlik</span></a>
                  <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo" target='_blank' rel='noreferrer'><span>Reklam Bilgisi</span></a>
                  <a href="https://blog.twitter.com/" target='_blank' rel='noreferrer'><span>Blog</span></a>
                  <a href="" target='_blank' rel='noreferrer'><span>Durum</span></a>
                  <a href="https://careers.twitter.com/en" target='_blank' rel='noreferrer'><span>Kariyer</span></a>
                  <a href="https://about.twitter.com/tr/company/brand-resources" target='_blank' rel='noreferrer'><span>Marka Kaynakları</span></a>
                  <a href="https://business.twitter.com/en/advertising.html?ref=gl-tw-tw-twitter-advertise" target='_blank' rel='noreferrer'><span>Reklam</span></a>
                  <a href="https://business.twitter.com/" target='_blank' rel='noreferrer'><span>Pazarlama</span></a>
                  <a href="https://business.twitter.com/?ref=web-twc-ao-gbl-twitterforbusiness&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=twitterforbusiness" target='_blank'><span>İşletmeler İçin X</span></a>
                  <a href="https://developer.twitter.com/en" target='_blank' rel='noreferrer'><span>Geliştiriciler</span></a>
                  <a href="https://twitter.com/i/directory/profiles" target='_blank' rel='noreferrer'><span>Dizin</span></a>
                  <a href="https://twitter.com/settings/account/personalization" target='_blank' rel='noreferrer'><span>Ayarlar</span></a>
                  <a style={{textDecoration:'none', cursor:'default'}}><span>© 2023 X Corp.</span></a>
               </nav>
            </div>
         </div>
      </div>
   </div>

}


export default LogOut




