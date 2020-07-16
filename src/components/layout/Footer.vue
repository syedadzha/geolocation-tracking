<template>
  <div class="footer">
    <footer class="page-footer orange">
      <div class="footer-copyright">
        <div class="container">
          <a class="grey-text text-lighten-4 pr-4" href="#!"
            >© 2020 Copyright
          </a>
          <a class="grey-text text-lighten-4 pr-4 d-none" href="#!" >Term of Service</a>
          <a class="grey-text text-lighten-4 pr-4" href="#!">Privacy Policy</a>
          <a class="grey-text text-lighten-4" href="#!">Contact Us</a>
          <a
            class="grey-text text-lighten-4 right d-none"
            href="https://www.linkedin.com/in/adzhmin"
            ><i class="fa fa-linkedin" aria-hidden="true"></i
          ></a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="">
.footer{
  z-index: 2;
}
.pr-4 {
  padding-right: 15px;
}
.pl-4 {
  padding-left: 15px;
}
.footer {
  height: 100%;
  margin-top: 870px;
  z-index: -1;
}
.footer i {
  font-size: 20px;
}

@media only screen and (max-width: 600px) {
    .d-none{
        display: none;
    }
}
</style>
