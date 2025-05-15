<script setup>
// Import AgnosticUI global common & component CSS
import "agnostic-vue/dist/common.min.css";
import "agnostic-vue/dist/index.css";
import { Header, HeaderNav, HeaderNavItem, Menu } from "agnostic-vue";
import { Icon } from "agnostic-vue";
import { ref } from 'vue';

const base = import.meta.env.BASE_URL == '/' ? '' : import.meta.env.BASE_URL;
const year = ref(new Date().getFullYear());
</script>
<template>
  <footer >
    <div class="footer-container">
      <div class="footer-columns">
        
        <!--- col 1 --->
        <div class="footer-column"> 
          <div class="tap-logo">
            <p style="justify-content: center;">
              <a :href="base" >
                <img :src="`${base == '/' ? '' : base}/images/tap-logo-dark.jpg`"  class="imageDark">
                <img :src="`${base == '/' ? '' : base}/images/tap-logo-light.png`" class="imageLight">
              </a>
            </p>      
            <h4>
              <a href="https://www.ggc.edu/academics/school-of-science-and-technology/research-internships-service-learning/technology-ambassador-program/tap-application" target="_blank">Apply</a>
            </h4>

            <h4>Follow Us</h4>
            <ul class="social-media-icons">
              <li><a href="https://github.com/TAP-GGC" target="_blank" rel="noopener noreferrer"><img :src= "`${base}/logos/github-logo.svg`" alt="Github Icon"></a></li>
              <!-- <li><a href="#" target="_blank" rel="noopener noreferrer"><img :src= "`${base}/logos/instagram-logo.svg`" alt="Instagram Icon"></a></li> -->
              <li><a href="https://www.linkedin.com/search/results/all/?keywords=tapggc&origin=GLOBAL_SEARCH_HEADER&sid=O4S" target="_blank" rel="noopener noreferrer"><img :src= "`${base}/logos/linkedin-logo.svg`" alt="LinkedIn Icon"></a></li>
            </ul>
          </div>
        </div> 

        <!--- col 2 --->
        <div class="footer-column"> 
           <div class="nsf-statement">
            <p>
              <a href="https://www.nsf.gov/" target="_blank" rel="noopener noreferrer"><img :src="`${base}/logos/NSF_Official_logo.png`" alt="NSF Logo"></a>
            </p>
            <p>           Supported by National Science Foundation Broadening Participation in Computing (BPC) 
            Demo Project #2315804  </p>      
          </div>
        
          
        </div> 

        <!--- col 3 --->
        <div class="footer-column" style=""> 
          <div class="contact">
            <h4>Contact Us</h4>

            <ul>
              <li>
                <p>Email: 
                  <a href="mailto:admin@tapggc.org" target="_blank">admin@tapggc.org</a>
                </p>
              </li>
              <li>
                <p>Address: </p>
                <p>
                  <a href="https://www.ggc.edu/academics/school-of-science-and-technology/information-technology" target="_blank">Department of Information Technology</a> </p>
                  <p><a href="https://www.ggc.edu/academics/school-of-science-and-technology"> School of Science and Technology</a></p>
                  <p>
                    <a href="https://www.ggc.edu"> Georgia Gwinnett College</a>
                </p>
                <p>
                  1000 University Center Ln, </p>
                  <p>Lawrenceville, GA 30043
                </p>
              </li>
              <li>
                <a href="https://www.ggc.edu">
                <img src="/logos/ggc-logo-dark.png"  class="imageDark">
                <img src="/logos/ggc-logo-light.png" class="imageLight">
              </a>
              </li>
            </ul>
          
            
          </div> 
        </div> 
      </div> 
      <!--end of footer columns -->
     

      <div class="copyright">
          <p>&copy; {{year}} Technology Ambassador Program. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-container{
    display: flex;
    /* position: relative; */
    flex-direction: column;
    /* bottom: 0; */
    width: 100vw;
    text-align: center;
    padding: 20px;
    background-color: var(--agnostic-light);
    font-weight: 300;
    margin: 0 auto;
    box-sizing: border-box;
    align-content: center;
    flex-wrap: wrap;
    /* max-width: 1770px;     */
}

.footer-columns {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 0.25em;
}

.footer-column {
  display: flex;
  flex: 1;
  margin: 0 auto;
  flex-direction: column;
}

h4 {
  margin-bottom: 5px;
  font-size: 1em;
}
p, ul{
  font-size: 11px;
}

ul {
  list-style-type: none;
  padding: 0;
  display: inline-block;
  text-align: left;
}

.footer-column ul li {
  margin-bottom: 1em;
}

.tap-logo{
  justify-content: center;
}

.tap-logo a img{
  max-height: 100px;
  margin: 0 auto;
}
.contact{
  margin-top: 30px;
  line-height: 0.5;
}
.social-media-icons li {
  display: inline-block;
  margin-right: 7px;
}

.social-media-icons li a img{
  height: 35px;
}

.nsf-statement {
  text-align: center;
  max-width: 800px;

}

.nsf-statement p {
  margin-bottom: 10px;
}

.nsf-statement a img{
  height: 60px;
}

.copyright {
  text-align: center;
}

.contact li a img{
  height: 40px;
  margin: 0 auto
}

@media (max-width: 840px) {
  .tap-logo a img{
  height: 50px;
}
  p, ul{
    font-size: 10px;
    line-height: 1 !important;
  }
  h4{
    font-size: 13px;
    margin-bottom: 4px;
    line-height: 1 !important;

  }
  .footer-column{
    flex-basis: 100%; 
    max-width: 100%; 
    height: auto;
  }
  .nsf-statement a img{
  height: 40px;
}
.contact{
  margin-top: 0;
}
.footer-column ul li {
  margin-bottom: 0.125em;
}

.nsf-statement {
  text-align: center;
  max-width: 300px;
  margin: 0 auto;

}
.nsf-statement p{
  margin-bottom: 4px;
}

.social-media-icons li a img{
  height: 25px;
}
}
</style>