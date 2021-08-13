<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <div class="top">
        <!-- <v-btn href="/login" large plain>
          로그인
          <v-icon dark>mdi-login-variant</v-icon>
        </v-btn> -->
        <v-btn large plain @click="logout()">
          로그아웃
          <v-icon dark>mdi-logout-variant</v-icon>
        </v-btn>
        <v-btn class="btn_close" large icon @click="drawer = !drawer">
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </div>

      <div>
        <!-- [if:로그인 완료] 사용자 정보 -->
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">홍길동</v-list-item-title>
              <v-list-item-subtitle>
              </v-list-item-subtitle>
              <div class="introduce_point">
                <div class="point">
                  <v-icon small>mdi-cash-100</v-icon>
                  <span class="amount">52,000</span>
                  <em class="unit">CHOO</em>
                </div>

                <!-- 포인트 안내 Dialog -->
                <v-row justify="center">
                  <v-dialog
                    v-model="dialog"
                    scrollable
                    max-width="500px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn small elevation="0" v-bind="attrs" v-on="on">CHOO 포인트 안내</v-btn>
                      <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">Open Dialog33</v-btn> -->
                    </template>
                    <v-card>
                      <v-card-title>CHOO 포인트 안내</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="margin-top: 20px;max-height: 70vh;">
                        <li>CHOO 포인트는 실제 상품구매 등에 사용할 수 있는 포인트가 아니며, 추마켓에서 진행하는 이벤트 및 행사 참여 이외에는 사용하실 수 없습니다.</li>
                        <li>CHOO 포인트는 현금 또는 재화로 교환할 수 없습니다.</li>
                        <li>CHOO 포인트는 추마켓에서 다양한 활동을 통해 획득하실 수 있습니다.
                          <div style="margin-left: 20px;">
                          - 로그인 시 1일 1포인트 적립<br>
                          - 상품 좋아요 1건 당 1포인트 적립 고객리뷰 작성 시 1건 당 5포인트 적립
                          </div>
                        </li>
                        <li>획득하신 CHOO 포인트를 통해 다양한 행사 또는 이벤트에 참여하실 수 있습니다.</li>
                        <li>회원탈퇴 시 보유하신 CHOO 포인트는 모두 소멸 됩니다.</li>
                        <li>부정한 방법으로 획득한 CHOO 포인트는 운영진에 의해 소멸될 수</li>
                        있습니다.
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </div>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-icon>mdi-menu-right</v-icon>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item-group v-model="group" color="primary" active-class="deep-purple--text text--accent-4">
            <v-list-item href="/shop">
              <v-list-item-icon>
                <v-icon v-text="'mdi-shopping'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'상품'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item href="/event">
              <v-list-item-icon>
                <v-icon v-text="'mdi-calendar-heart'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'이벤트'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>


        
      </div>

      <div class="bottom">
        <!-- [if:로그인 완료] -->
        <v-btn elevation="0" @click="withdraw()">탈퇴하기 <v-icon dark>mdi-account-alert</v-icon></v-btn>
        <!-- 추가로 기능상 버튼이 필요한 경우 아래 버튼 사용 -->
        <!-- <v-btn elevation="0">기타 버튼</v-btn> -->
      </div>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>MarketChoo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <h2>heading2</h2>
      <h3>heading3</h3>
      <h4>heading4</h4>
    </v-main>
  </v-app>
</template>

<script>
// import WireNav from "@/components/WireNav";

export default {
  // components: {
  //   WireNav,
  // },
  name: 'Wireframe',
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    withdraw() {
      const message = confirm('회원 탈퇴 시 보유하신 CHOO 포인트는 모두 소멸됩니다.\n정말 탈퇴하시겠습니까?');
      if(message) {
        alert('탈퇴가 완료되었습니다.');
      }
    },
  },
  data: () => ({ 
    drawer: false,
    group: null,

    // for Dialog
    dialogm1: '',
    dialog: false,
  }),
  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>