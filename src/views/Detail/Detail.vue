<template>
    <div class="detail" :class="{ 'detail--collapsed': collapsed }">
        <div class="detail__top">
            <h1 class="detail__title">Верификация</h1>
            <button class="btn btn--outline detail__submit-btn" @click="onSubmit">отправить на доработку</button>
        </div>

        <div class="detail__conditions">
            <div class="data-block data-block--vertical">
                <div class="data-block__inner">
                    <div class="data-block__item">
                        <p class="data-block__title">{{ organization_name }}</p>
                        <p class="data-block__subtitle">Заявка на верификацию от {{ created_at }}</p>
                    </div>
                    <div class="data-block__item data-block__item--list">
                        <div class="data-block__item">
                            <p class="data-block__title data-block__title--small">Сроки выполнения</p>
                            <p class="data-block__subtitle data-block__subtitle--small">
                                Необходимо принять решение до {{ expired_at }}</p>
                        </div>
                        <div class="data-block__item">
                            <p class="data-block__title data-block__title--small">Координатор</p>
                            <p class="data-block__subtitle data-block__subtitle--small">
                                {{ coordinator.full_name }}
                                <span @click="toggleModal" class="data-block__link">Изменить</span>
                            </p>
                        </div>
                    </div>
                </div>
                <button class="btn btn--outline data-block__submit-btn" @click="onSubmit">отправить на доработку</button>
            </div>
        </div>

        <div class="detail__contacts">
            <div class="data-block data-block--horizontal">
                <p class="data-block__head-title">Контактная информация</p>
                <div class="data-block__inner">
                    <div class="data-block__item">
                        <p class="data-block__title data-block__title--small">Имя</p>
                        <p class="data-block__subtitle">{{ contact_name }}</p>
                    </div>
                    <div class="data-block__item">
                        <p class="data-block__title data-block__title--small">Email</p>
                        <p class="data-block__subtitle">
                            <a class="data-block__link2" :href="'mailto:'+contact_email">{{ contact_email }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <Modal
            :coordinator="coordinator"
            :showModal="showModal"
            @submit="changeCoordinator"
            @closeModal="toggleModal"/>
    </div>
</template>

<script src="./Detail.js"></script>
<style src="./Detail.sass" lang="sass"></style>
