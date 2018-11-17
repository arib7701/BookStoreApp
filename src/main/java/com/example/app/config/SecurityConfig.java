package com.example.app.config;

import com.example.app.services.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // Injection of bean
    @Autowired
    private Environment env;

    @Autowired
    private UserSecurityService userSecurityService;

    private static final String HEADER_X_AUTH_TOKEN = "X-Auth-Token";

    // To encrypt password using bcrypt
    private BCryptPasswordEncoder passwordEncoder() {
        return SecurityUtility.passwordEncoder();
    }

    // Path with no security
    private static final String[] PUBLIC_MATCHES = {
            "/css/**",
            "/js/**",
            "/static/image/**",
            "/static/**",
            "/user/**",
            "/image/**"
    };

    // For debugging purpose - need to be changed for production
    // cross domain block disable
    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().cors().disable().httpBasic().and().authorizeRequests()
                .antMatchers(PUBLIC_MATCHES).permitAll().anyRequest().authenticated();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userSecurityService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public HttpSessionIdResolver httpSessionStrategy() {
        return new HeaderHttpSessionIdResolver(HEADER_X_AUTH_TOKEN);
    }

}