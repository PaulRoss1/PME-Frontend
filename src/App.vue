<template>
  <div id="wrapper">
    <header>
      <nav class="navbar navbar-expand-md navbar-light">
        <router-link to="/" class="navbar-brand"
          ><p>Prague <span>Music</span> Events</p></router-link
        >
      </nav>

      <div class="headline">
        <h1>
          Find the <span>next event</span> you'll want <span>to attend.</span>
        </h1>
      </div>
    </header>

    <section class="section">
      <router-view />
    </section>
    <div v-if="!$store.state.isLoading">
      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap";

$sm: 576px;
$md: 767px;
$lg: 992px;
$xl: 1200px;
$xxl: 1400px;

$gray: #333333;
$red: #e5091c;

* {
  margin: 0px;
  padding: 0px;
  font-family: "Ubuntu", sans-serif;
}

.dropdown-item:focus {
  background-color: #d6d6d6 !important;
}

.category-underline {
  border-bottom: 3px solid #e5091c !important;
  padding-bottom: 23px;
  @media screen and (max-width: $md) {
    padding-bottom: 5px;
  }
}

@keyframes growDown {
  0% {
    transform: scaleY(0);
  }
  80% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(1);
  }
}

.info-box {
  background-color: #333333;
  padding: 8px;
  text-decoration: none;
  max-height: 520px;
  position: absolute;
  margin-top: 43px;
  z-index: 1;
  font-weight: 400;

  animation: growDown 600ms ease-in-out forwards;
  transform-origin: top center;

  @media screen and (max-width: 400px) {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: $red;
    font-weight: 400;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;

  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  text-align: center;

  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
    text-align: center;
  }
}

header {
  nav {
    background-color: #333333;
    .navbar-brand {
      font-size: 30px;
      font-weight: 900;
      text-transform: uppercase;
      padding-left: 5%;
      padding-top: 20px;
      @media screen and (max-width: $sm) {
        padding-left: 2%;
        font-size: 21px;
      }
      p {
        color: white;
        span {
          color: #e5091c;
        }
      }
    }
    .navbar-nav {
      padding-right: 5%;
      margin-left: auto;
      @media screen and (max-width: $md) {
        padding-left: 30px;
        padding-top: 10px;
      }
    }
  }
  .headline {
    padding-bottom: 43px;
    padding-top: 8px;
    background-color: #333333;
    color: white;

    h1 {
      font-size: clamp(35px, 4vw, 52px);
      max-width: 90%;
      margin: auto;
      text-align: center;
      font-weight: 300;
      span {
        font-weight: 700;
      }
    }
  }
}

footer {
  min-height: 105px;
  background-color: #333333;
}
</style>
