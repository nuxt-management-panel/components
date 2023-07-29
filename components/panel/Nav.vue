<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light noprint">
    <div class="container-fluid" id="nav">
      <div class="collapse navbar-collapse d-flex justify-content-between w-100" id="navbarSupportedContent">

        <img src="/icons/menu.png" height="30" width="30" class="d-block d-lg-none" type="button"
             data-bs-toggle="offcanvas"
             data-bs-target="#offcanvasExample"
             aria-controls="offcanvasExample">

        <div class="d-md-block d-none"></div>

        <div class="d-flex">
          <!--
                    <div class="dropdown mx-2">
                              <span class="badge bg-danger d-block p-0 position-absolute"
                                    style="width: 10px;height: 10px;border-radius: 50px"></span>
                      <img class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                           data-bs-display="static" aria-expanded="false" src="/icons/logo.svg"
                           style="width: 4rem;height: 4rem;border-radius: 5px">
                      <div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton2"
                           style="min-width: 20rem">
                        <h5 class="mx-3">اعلان ها</h5>
                        <ul class="p-0 mt-4 mb-0" style="list-style: none">
                          <li><a class="dropdown-item m-0" href="#">
                            <div class="m-0 d-flex"><p>اعلان اول</p><span class="badge bg-danger d-block p-0"
                                                                          style="width: 10px;height: 10px;border-radius: 50px"></span>
                            </div>
                            <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                          </a></li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0" href="#">
                              <div class="m-0 d-flex"><p>اعلان اول</p><span class="badge bg-danger d-block p-0"
                                                                            style="width: 10px;height: 10px;border-radius: 50px"></span>
                              </div>
                              <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                            </a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0" href="#">
                              <div class="m-0 d-flex"><p>اعلان اول</p>
                              </div>
                              <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                            </a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0 text-muted d-flex justify-content-center align-items-center"
                               href="#">
                              مشاهده همه
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="dropdown mx-2">
                      <img class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown"
                           data-bs-display="static" aria-expanded="false" src="/icons/logo.svg"
                           style="width: 4rem;height: 4rem;border-radius: 5px">
                      <div class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton2"
                           style="min-width: 20rem">
                        <h5 class="mx-3">اعلان ها</h5>
                        <ul class="p-0 mt-4 mb-0" style="list-style: none">
                          <li><a class="dropdown-item m-0" href="#">
                            <div class="m-0 d-flex"><p>اعلان اول</p><span class="badge bg-danger d-block p-0"
                                                                          style="width: 10px;height: 10px;border-radius: 50px"></span>
                            </div>
                            <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                          </a></li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0" href="#">
                              <div class="m-0 d-flex"><p>اعلان اول</p><span class="badge bg-danger d-block p-0"
                                                                            style="width: 10px;height: 10px;border-radius: 50px"></span>
                              </div>
                              <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                            </a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0" href="#">
                              <div class="m-0 d-flex"><p>اعلان اول</p>
                              </div>
                              <span class="text-muted" style="font-size: small">2 آبان 1400  14:05</span>
                            </a>
                          </li>
                          <li>
                            <hr class="dropdown-divider" style="color: #dfdfdf;">
                          </li>
                          <li>
                            <a class="dropdown-item m-0 text-muted d-flex justify-content-center align-items-center"
                               href="#">
                              مشاهده همه
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
          -->

          <div class="dropdown mx-3">
            <img class="dropdown-toggle" data-bs-display="static" id="dropdownMenuButton3"
                 data-bs-toggle="dropdown" aria-expanded="false" src="/icons/logo.svg"
                 style="width: 50px;height: 50px;border-radius: 5px;cursor: pointer">
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton2"
                 style="min-width: 13rem">
              <!--              <a class="d-flex align-items-center text-dark" style="cursor: pointer">
                              <h5 class="mx-3">
                                ....
                              </h5>
                            </a>
                            <span class="small text-muted mx-3">....</span>-->
              <ul class="p-0 m-0" style="list-style: none">
                <!--                <li>
                                  <hr class="dropdown-divider" style="color: #dfdfdf;">
                                </li>-->
                <!--
                                <li>
                                  <a class="dropdown-item d-flex align-items-center cursor"
                                     data-bs-toggle="modal"
                                     data-bs-target="#profile">
                                    <i class="fa-solid fa-user-gear"></i>
                                    <span class="mx-2">ویرایش پروفایل</span>
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item d-flex align-items-center cursor"
                                     data-bs-toggle="modal"
                                     data-bs-target="#change-pass">
                                    <i class="fa-solid fa-key"></i>
                                    <span class="mx-2">تغییر گذرواژه</span>
                                  </a>

                                </li>
                                -->
                <li>
                  <div class="dropdown-item d-flex align-items-center cursor">
                    <i class="fa-solid fa-power-off text-danger"></i>
                    <span class="mx-2 text-danger" @click="logout">خروج</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>


      </div>
      <!--

              <div class="modal fade" id="change-pass" tabindex="-1"
                   aria-labelledby="change-passLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="change-passLabel">تغییر گذرواژه</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"
                              aria-label="Close"></button>
                    </div>
                    <form action="{% url 'change_password' %}" method="post">
                      {% csrf_token %}
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-md-12 mt-3">
                            <label class="form-label">گذرواژه جدید</label>
                            <input type="password" class="form-control" name="password"
                                   required>
                          </div>
                          <div class="col-md-12 mt-3">
                            <label class="form-label">تکرار گذرواژه جدید</label>
                            <input type="password" class="form-control" name="repeat-password"
                                   required>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="submit" class="btn px-4 main-bg-color text-center">ثبت
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="modal fade" id="profile" tabindex="-1"
                   aria-labelledby="profile" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="change-passLabel">تغییر پروفایل</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"
                              aria-label="Close"></button>
                    </div>
                    <form action="{% url 'edit-profile' %}" enctype="multipart/form-data" method="post">
                      {% csrf_token %}
                      <div class="modal-body">
                        <div class="row">
                          <div class="row col-12 col-md-5">
                            <div class="col-6 d-flex justify-content-center">
                              <img id="avatar_img" src="{{ request.user.personnel_id.avatar }}"
                                   class="bg-light rounded"
                                   style="width: 6rem;height: 6rem"/>
                              <input type='file' accept=".png,.PNG,.jpg,.JPG,jpeg,.JPEG"
                                     name="avatar" class="d-none"
                                     id="avatar_input"/>
                            </div>
                            <div class="col-6 d-flex align-items-end">
                              <button onclick="change_avatar()" type="button"
                                      class="btn px-4 btn-outline-main text-center">تغییر آواتار
                              </button>
                            </div>
                          </div>
                          <div class="row col-12 col-md-5 mt-3 mt-md-0">
                            <div class="col-6 d-flex justify-content-center">
                              <img id="sign_img" src="{{ request.user.personnel_id.signature }}"
                                   class="bg-light rounded" style="width: 6rem;height: 6rem"/>
                              <input type='file' accept=".png,.PNG,.jpg,.JPG,jpeg,.JPEG"
                                     name="sign" class="d-none"
                                     id="sign_input"/>
                            </div>
                            <div class="col-6 d-flex align-items-end">
                              <button onclick="change_sign()" type="button"
                                      class="btn px-4 btn-outline-main text-center">تغییر امضا
                              </button>
                            </div>
                          </div>
                          <div class="col-12 col-md-4 mt-5">
                            <label class="form-label">نام</label>
                            <input value="{{ request.user.personnel_id.full_name }}" type="text"
                                   class="form-control" name="full_name"
                                   required>
                          </div>
                          <div class="col-12 col-md-4 mt-5">
                            <label class="form-label">شماره موبایل</label>
                            <input value="{{ request.user.personnel_id.phone }}" type="text"
                                   class="form-control" name="phone"
                                   required>
                          </div>
                          <div class="col-12 col-md-4 mt-5">
                            <label class="form-label">ایمیل</label>
                            <input value="{{ request.user.personnel_id.email }}" type="text"
                                   class="form-control" name="email"
                                   required>
                          </div>
                          <div class="col-12 col-md-12 mt-3">
                            <label class="form-label">آدرس</label>
                            <input value="{{ request.user.personnel_id.address }}" type="text"
                                   class="form-control" name="address"
                                   required>
                          </div>

                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="submit" class="btn px-4 main-bg-color text-center">ثبت
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              -->
    </div>
  </nav>
</template>

<script>
import {navigateTo, useCookie, useFetch, useRuntimeConfig} from "nuxt/app";

export default {
  name: "Nav",
  data() {
    return {
      runTimeConfig: useRuntimeConfig()
    }
  },
  methods: {
    logout() {
      const {data} = useFetch(this.runTimeConfig.apiBase + '/user/logout', {
            method: "GET",
            credentials: 'include',

            onResponse(context) {
              if (context.response.status === 200)
                navigateTo('/')
              else
                alert('Error')
            },
            onResponseError(context) {
              alert('Error')
            }
          }
      )


    }
  }
}
</script>

<style scoped>

</style>