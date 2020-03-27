package com.ochiwerks.apps.gallery.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Resource.
 */
@Entity
@Table(name = "resource")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Resource implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "is_favourite")
    private Boolean isFavourite;

    @OneToOne
    @JoinColumn(unique = true)
    private Metadata metadata;

    @OneToMany(mappedBy = "resource")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Author> authors = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("resources")
    private Author author;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public Resource url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean isIsFavourite() {
        return isFavourite;
    }

    public Resource isFavourite(Boolean isFavourite) {
        this.isFavourite = isFavourite;
        return this;
    }

    public void setIsFavourite(Boolean isFavourite) {
        this.isFavourite = isFavourite;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public Resource metadata(Metadata metadata) {
        this.metadata = metadata;
        return this;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public Resource authors(Set<Author> authors) {
        this.authors = authors;
        return this;
    }

    public Resource addAuthor(Author author) {
        this.authors.add(author);
        author.setResource(this);
        return this;
    }

    public Resource removeAuthor(Author author) {
        this.authors.remove(author);
        author.setResource(null);
        return this;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Author getAuthor() {
        return author;
    }

    public Resource author(Author author) {
        this.author = author;
        return this;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Resource)) {
            return false;
        }
        return id != null && id.equals(((Resource) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Resource{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", isFavourite='" + isIsFavourite() + "'" +
            "}";
    }
}
