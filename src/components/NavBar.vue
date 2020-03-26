<template>
    <b-navbar class="is-spaced">
        <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/Viewer' }">
                Viewer
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>