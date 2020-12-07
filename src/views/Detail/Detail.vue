<template>
    <div class="detail">
        <div class="detail__top">
            <h1 class="detail__title">Верификация</h1>
        </div>

        <div class="detail__conditions">
            <div class="data-block">
                <div class="data-block__list">
                    <div class="data-block__item">
                        <p class="data-block__title">{{ organization_name }}</p>
                        <div class="data-block__subtitle">Заявка на верификацию от {{ created_at }}</div>
                    </div>
                    <div class="data-block__item row">
                        <div class="data-block__item col col--6 col-sm--12">
                            <p class="data-block__title data-block__title--small">Сроки выполнения</p>
                            <div class="data-block__subtitle data-block__subtitle--small">
                                Необходимо принять решение по заявке до {{ expired_at }}</div>
                        </div>
                        <div class="data-block__item col col--6 col-sm--12">
                            <p class="data-block__title data-block__title--small">Координатор</p>
                            <div class="data-block__subtitle data-block__subtitle--small">
                                {{ coordinator.full_name }}
                                <span @click="toggleModal">Изменить</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span class="btn btn--outline detail__submit-btn" @click="onSubmit">отправить на доработку</span>
            </div>
        </div>

        <div class="detail__contacts">
            <div class="data-block">
                <p class="data-block__head-title">Контактная информация</p>
                <div class="data-block__item">
                    <div class="row row--no-gap">
                        <div class="col col--5 col-sm--12">
                            <p class="data-block__title data-block__title--small">Имя</p>
                        </div>
                        <div class="col col--7 col-sm--12">
                            <div class="data-block__subtitle">{{ contact_name }}</div>
                        </div>
                    </div>
                </div>
                <div class="data-block__item">
                    <div class="row row--no-gap">
                        <div class="col col--5 col-sm--12">
                            <p class="data-block__title data-block__title--small">Email</p>
                        </div>
                        <div class="col col--7 col-sm--12">
                            <div class="data-block__subtitle">{{ contact_email }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            :coordinatorList="coordinatorList"
            :coordinator="coordinator"
            :showModal="showModal"
            @submit="changeCoordinator"
            @closeModal="toggleModal"/>
    </div>
</template>

<script src="./Detail.js"></script>
<style src="./Detail.sass" lang="sass"></style>
